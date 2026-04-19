import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

import { SOCIAL_LINKS } from "@/data/socials"
import {
  Card,
  CardFrame,
  CardPanel,
  Separator,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@packages/ui/shared"

export function AboutMe() {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <h2 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
          But, Who I am?
        </h2>
        <Separator className="flex-1" />
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger
                render={
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  />
                }
              >
                <link.Icon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipPopup>{link.handler}</TooltipPopup>
            </Tooltip>
          ))}
        </div>
      </div>
      <CardFrame className="w-full">
        <Card>
          <CardPanel>
            <div className="text-muted-foreground text-sm leading-tight">
              <p>
                I truly love building things that live in the cloud and solve puzzles on the ground.
                Over the last 4+ years, I have been a Software Engineer and Tech Lead, bridging the
                gap between fast-moving startups and deep-thinking academia.{" "}
                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-foreground cursor-pointer underline underline-offset-4"
                  >
                    See more
                  </button>
                )}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      I enjoy the &quot;heavy lifting&quot;, designing systems that don&apos;t just
                      scale, but actually make sense from the first line of code to the final
                      deployment. Lately, I have been channeling my obsession with speed and data
                      into self-learning{" "}
                      <span className="text-foreground font-medium">AI Engineering</span>, trying to
                      build tools that feel a bit like magic. I believe great engineering is about
                      more than just code; it&apos;s about building products that people actually
                      want to use.{" "}
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="text-foreground cursor-pointer underline underline-offset-4"
                      >
                        See less
                      </button>
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </div>
          </CardPanel>
        </Card>
      </CardFrame>
    </section>
  )
}
