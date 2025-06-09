import type React from "react"
import type { Metadata, Viewport } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const siteUrl = "https://demark.md"
const siteTitle = "Demark: Swift HTML to Markdown Converter | Fast & Accurate"
const siteDescription =
  "Demark is a powerful Swift package for converting HTML to clean Markdown. Features two engines for accuracy (Turndown.js) and speed (html-to-md). Ideal for iOS, macOS, watchOS, tvOS, and visionOS apps."
const ogImage = `${siteUrl}/images/banner-1.png` // Assuming banner-1.png is in public/images

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Demark",
    "Swift",
    "HTML to Markdown",
    "Markdown Converter",
    "iOS",
    "macOS",
    "watchOS",
    "tvOS",
    "visionOS",
    "Turndown.js",
    "html-to-md",
    "Peter Steinberger",
  ],
  authors: [{ name: "Peter Steinberger", url: "https://steipete.me" }],
  creator: "Peter Steinberger",
  publisher: "Peter Steinberger",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Demark",
    images: [
      {
        url: ogImage,
        width: 1200, // Adjust if your banner has different dimensions
        height: 630, // Adjust if your banner has different dimensions
        alt: "Demark: HTML in -> Markdown out",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
    creator: "@steipete", // Assuming Peter Steinberger's Twitter handle
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // If you plan to add a webmanifest
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#0A192F", // Matches demark-bg
  colorScheme: "dark", // Assuming a predominantly dark theme
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-demark-bg", // Added bg-demark-bg here
          fontSans.variable,
        )}
      >
        {/*
          Assuming you might have a ThemeProvider for shadcn/ui dark/light mode,
          but since the page is explicitly dark, it might not be strictly necessary
          for this specific landing page if it's always dark.
          If you don't use ThemeProvider, you can remove it.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false} // Force dark theme based on design
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
