import { dmSans, libreBaskerville } from "@packages/ui/lib/fonts"
import "@packages/ui/styles/globals.css"
import "katex/dist/katex.min.css"

export { metadata } from "@/lib/metadata"

import { ThemeProvider } from "@packages/ui/providers/theme-provider"
import { TooltipProvider } from "@packages/ui/providers/tooltip-provider"

import { BackgroundFlickeringGrid } from "@packages/ui/shared/background/background-flickering-grid"
import { BackToTop } from "@/components/shared/back-to-top"
import { NavigationPill } from "@/components/shared/navigation-pill"
import { Footer } from "@/components/shared/footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${libreBaskerville.variable} ${dmSans.variable} bg-background text-foreground font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={0}>
            <div className="selection:bg-foreground selection:text-background relative min-h-screen w-full">
              <NavigationPill />
              <main className="relative z-10 mx-auto max-w-xl px-6 pt-32">
                {children}
                <Footer />
              </main>
              <BackToTop />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black)]">
                <BackgroundFlickeringGrid
                  className="h-full w-full"
                  squareSize={3}
                  gridGap={6}
                  color="#64748b"
                  maxOpacity={0.3}
                  flickerChance={0.2}
                />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
