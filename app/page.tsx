import AnimatedBackground from "@/components/animated-background"
import NewsletterForm from "@/components/newsletter-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, BookOpen, Zap, ExternalLink, Code2 } from "lucide-react"
import Link from "next/link"

export default function DemarkLandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-demark-light-blue overflow-x-hidden">
      <AnimatedBackground />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        <header className="text-center mb-16 sm:mb-24 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight">
            <span className="text-demark-cyan">DEMARK</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-demark-light-blue flex items-center justify-center space-x-2">
            <span>HTML in</span>
            <ExternalLink className="h-6 w-6 sm:h-7 sm:w-7 text-demark-cyan inline-block" />
            <span>Markdown out</span>
            <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400 inline-block" />
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-demark-cyan hover:bg-opacity-80 text-demark-bg font-semibold w-full sm:w-auto"
            >
              <Link href="https://github.com/steipete/Demark" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View on GitHub
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-slate-800 border border-demark-cyan text-demark-cyan hover:bg-slate-700 font-semibold w-full sm:w-auto"
            >
              <Link href="https://swiftpackageindex.com/steipete/Demark" target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-5 w-5" /> Swift Package Index
              </Link>
            </Button>
          </div>
        </header>

        <section id="about" className="mb-16 sm:mb-24 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-demark-cyan">What is Demark?</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-center">
            <p>
              Demark is a Swift package designed to convert messy, potentially malformed HTML into clean, pristine
              Markdown. It's the little helper that chomps HTML and spits out beautiful Markdown, perfect for any Swift
              application needing robust HTML processing.
            </p>
            <p>
              Born out of the need for a reliable solution to handle real-world HTML, Demark leverages the power of
              proven JavaScript libraries (
              <Link
                href="https://github.com/mixmark-io/turndown"
                target="_blank"
                rel="noopener noreferrer"
                className="text-demark-cyan hover:underline"
              >
                Turndown.js
              </Link>{" "}
              &{" "}
              <Link
                href="https://github.com/stonehank/html-to-md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-demark-cyan hover:underline"
              >
                html-to-md
              </Link>
              ) by running them inside a WKWebView. This gives you access to full browser DOM parsing capabilities right
              within your Swift code.
            </p>
          </div>
        </section>

        <section id="features" className="mb-16 sm:mb-24 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-demark-cyan">
            Two Powerful Engines
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 text-demark-light-blue">
              <CardHeader>
                <CardTitle className="text-demark-cyan text-2xl">Turndown.js (Default)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>For Maximum Accuracy:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Full DOM-based parsing.</li>
                  <li>Handles complex HTML and JavaScript-rendered content.</li>
                  <li>Comprehensive configuration options.</li>
                  <li>~100ms for first conversion, then much faster.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-demark-light-blue">
              <CardHeader>
                <CardTitle className="text-demark-cyan text-2xl">html-to-md</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>For Blazing Speed:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Lightweight JavaScript-based conversion.</li>
                  <li>Much faster performance (~5-10ms per conversion).</li>
                  <li>Perfect for batch processing simpler HTML.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="usage" className="mb-16 sm:mb-24 animate-fadeIn" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-demark-cyan">Simple to Use</h2>
          <div className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center text-sm text-slate-400 mb-2">
              <Code2 className="h-4 w-4 mr-2 text-demark-cyan" />
              <span>Swift Example</span>
            </div>
            <pre className="overflow-x-auto text-sm">
              <code className="language-swift text-demark-light-blue">
                {`import Demark

@MainActor 
func convertHTML() async throws {
    let demark = Demark()
    let html = "<h1>Hello World</h1><p>This is <strong>bold</strong> text.</p>"
    let markdown = try await demark.convertToMarkdown(html)
    print(markdown)
    // Output: 
    // # Hello World
    //
    // This is **bold** text.
}`}
              </code>
            </pre>
            <p className="mt-4 text-sm text-slate-400">
              Demark works across all Apple platforms: iOS, macOS, watchOS, tvOS, and visionOS.
            </p>
          </div>
        </section>

        <section id="newsletter" className="mb-16 sm:mb-24 animate-fadeIn" style={{ animationDelay: "1s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-demark-cyan">Stay Updated</h2>
          <NewsletterForm />
        </section>
      </main>

      <footer
        className="text-center py-8 border-t border-slate-700 bg-demark-bg z-10 animate-fadeIn"
        style={{ animationDelay: "1.2s" }}
      >
        <p className="text-demark-symbol-blue text-sm">
          Demark by{" "}
          <Link
            href="https://steipete.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-demark-cyan hover:underline"
          >
            Peter Steinberger
          </Link>
          .
        </p>
        <p className="text-demark-symbol-blue text-sm">
          Released under the{" "}
          <Link
            href="https://github.com/steipete/Demark/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-demark-cyan hover:underline"
          >
            MIT License
          </Link>
          .
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link
            href="https://github.com/steipete/Demark"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Demark on GitHub"
          >
            <Github className="h-6 w-6 text-demark-symbol-blue hover:text-demark-cyan transition-colors" />
          </Link>
          <Link
            href="https://steipete.me/posts/2025/introducing-demark-html-to-markdown-in-swift/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Demark Blog Post"
          >
            <ExternalLink className="h-6 w-6 text-demark-symbol-blue hover:text-demark-cyan transition-colors" />
          </Link>
        </div>
      </footer>
    </div>
  )
}
