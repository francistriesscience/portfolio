import { Card, BackgroundRipple } from "@/components/ui"

export function WritingNotebookCard() {
  return (
    <Card className="group border-border from-background via-background to-muted/10 relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden border-dashed bg-gradient-to-br shadow-none transition-all">
      <BackgroundRipple className="absolute inset-0 opacity-20" numCircles={5} />
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-muted-foreground text-xs font-medium">Writing on it</h2>
      </div>
    </Card>
  )
}
