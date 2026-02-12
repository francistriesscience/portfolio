import "@/assets/styles/globals.css"
import { metadata } from "@/lib/metadata"

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
      <body className="font-writer overflow-x-hidden tracking-tight antialiased">
        {children}
        <BackToTopButton />
        <ProgressScroll />
      </body>
    </html>
  )
}
