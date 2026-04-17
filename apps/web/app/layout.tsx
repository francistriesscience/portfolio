import { dmSans, libreBaskerville } from "@packages/ui/lib/fonts"
import "@packages/ui/styles/globals.css"

import { metadata } from "@/lib/metadata"
export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${libreBaskerville.variable} ${dmSans.variable} bg-background antialiased`}>
        {children}
      </body>
    </html>
  )
}
