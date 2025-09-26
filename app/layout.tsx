import type { Metadata } from "next"

import "@/assets/styles/globals.css"
import { dmMono, dmSans } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Francis Ignacio | Who Tries Science",
  description:
    "Francis Ignacio is a software engineer and data scientist who loves to share his knowledge and experiences through his personal blog.",
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <main className="mx-auto h-full w-full max-w-2xl p-8 py-32 tracking-tight">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
