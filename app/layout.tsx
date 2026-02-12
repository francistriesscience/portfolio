import "@/assets/styles/globals.css"
import { metadata } from "@/lib/metadata"
import { libreBaskerville } from "@/lib/fonts"

export { metadata }

import { BackToTopButton } from "@/components/features/back-to-top-button"
import { ProgressScroll } from "@/components/ui/progress/progress-scroll"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-writer ${libreBaskerville.variable} overflow-x-hidden tracking-tight antialiased`}
      >
        {children}
        <BackToTopButton />
        <ProgressScroll />
      </body>
    </html>
  )
}
