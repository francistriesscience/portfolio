import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Francis Ignacio | Who Tries Science",
  description:
    "Passionate about the science behind AI and ML, I teach and share workflows that make complex ideas practical. With a software engineering background and AI engineering focus, I ship production-ready models, connect robust data pipelines, and translate research into dependable product features.",
  authors: [{ name: "Francis Ignacio", url: "https://francistries.science" }],
  creator: "Francis Ignacio",
  publisher: "Francis Ignacio",
  keywords: [
    "AI Engineering",
    "Machine Learning",
    "Software Engineering",
    "Next.js",
    "React",
    "TypeScript",
    "Data Pipelines",
    "Tech Lead",
  ],
  metadataBase: new URL("https://francistries.science"),
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://francistries.science",
    title: "Francis Ignacio | Who Tries Science",
    description:
      "Passionate about the science behind AI and ML, I teach and share workflows that make complex ideas practical. With a software engineering background and AI engineering focus, I ship production-ready models, connect robust data pipelines, and translate research into dependable product features.",
    siteName: "Christopher Francis Ignacio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Francis Ignacio Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis Ignacio | Who Tries Science",
    description:
      "Passionate about the science behind AI and ML, I teach and share workflows that make complex ideas practical. With a software engineering background and AI engineering focus, I ship production-ready models, connect robust data pipelines, and translate research into dependable product features.",
    images: ["/og-image.png"],
    creator: "@francistriesscie",
    site: "@francistriesscie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
}
