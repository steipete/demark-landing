import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);

test(
  "production site serves the landing page, assets, and 404s",
  { timeout: 60_000 },
  async (t) => {
    const server = spawn(
      process.execPath,
      [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "0"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    const stopped = once(server, "exit");
    let output = "";
    server.stdout.on("data", (chunk) => {
      output += chunk;
    });
    server.stderr.on("data", (chunk) => {
      output += chunk;
    });
    t.after(async () => {
      if (server.exitCode === null && server.signalCode === null) {
        server.kill("SIGTERM");
        const forceKill = setTimeout(() => server.kill("SIGKILL"), 5000);
        try {
          await stopped;
        } finally {
          clearTimeout(forceKill);
        }
      }
    });

    const baseUrl = await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error(`Server did not start:\n${output}`)),
        30_000,
      );
      const checkReady = () => {
        const address = output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
        if (address && output.includes("Ready")) {
          clearTimeout(timeout);
          resolve(address);
        }
      };
      server.stdout.on("data", checkReady);
      server.once("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      server.once("exit", (code) => {
        clearTimeout(timeout);
        reject(new Error(`Server exited (${code}):\n${output}`));
      });
    });

    const request = (path) =>
      fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(10_000) });
    const page = await request("/");
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-type"), /text\/html/);
    const html = await page.text();
    for (const content of ["DEMARK", "HTML in", "Markdown out", "Stay Updated", "bd-email"]) {
      assert.ok(html.includes(content), `Missing landing-page content: ${content}`);
    }
    assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/demark.md"/);
    t.diagnostic("GET / -> 200; landing-page content, newsletter form, and canonical URL verified");

    const assets = [
      ...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))(?:\?[^" ]*)?"/g),
    ].map((match) => match[1]);
    assert.ok(
      assets.some((asset) => asset.endsWith(".js")),
      "Missing JavaScript bundles",
    );
    assert.ok(
      assets.some((asset) => asset.endsWith(".css")),
      "Missing stylesheet",
    );
    for (const asset of new Set(assets)) {
      const response = await request(asset);
      assert.equal(response.status, 200, asset);
      assert.ok((await response.arrayBuffer()).byteLength > 0, `Empty asset: ${asset}`);
    }
    t.diagnostic(`GET ${new Set(assets).size} JavaScript/CSS assets -> 200; all nonempty`);

    const manifest = await request("/site.webmanifest");
    assert.equal(manifest.status, 200);
    const { icons } = await manifest.json();
    for (const icon of icons) {
      const response = await request(icon.src);
      assert.equal(response.status, 200, icon.src);
      assert.match(response.headers.get("content-type"), /image\/png/);
      await response.arrayBuffer();
    }
    t.diagnostic(`GET /site.webmanifest and ${icons.length} icons -> 200`);

    const missing = await request("/smoke-test-missing-page");
    assert.equal(missing.status, 404);
    await missing.text();
    t.diagnostic("GET /smoke-test-missing-page -> 404");
  },
);
