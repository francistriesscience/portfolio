import type { Metadata } from "next"

import "@/assets/styles/globals.css"
import { dmMono, dmSans } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Francis Ignacio | Who Tries Science",
  description:
    "Passionate about the science behind AI and ML, I teach and share workflows that make complex ideas practical. With a software engineering background and AI engineering focus, I ship production-ready models, connect robust data pipelines, and translate research into dependable product features.",
}

import { ThemeProvider } from "@/providers/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmMono.variable} ${dmSans.variable} overflow-x-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
