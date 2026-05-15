"use client"

import Link from "next/link"

import { PIN_CATEGORIES } from "@portfolio/web/data/pins"

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Badge,
  CardFrame,
  CardFrameFooter,
  Separator,
} from "@packages/ui/shared"

export function PinGrid() {
  return (
    <section className="flex flex-col gap-4">
      <Accordion className="w-full" defaultValue={[PIN_CATEGORIES[0]?.id]}>
        {PIN_CATEGORIES.map((category) => (
          <AccordionItem key={category.id} value={category.id} className="border-none">
            <AccordionTrigger className="px-0 py-4 outline-none hover:no-underline">
              <div className="flex w-full items-center gap-4 pr-4 text-left">
                <div className="flex shrink-0 items-center gap-2">
                  <h2 className="text-muted-foreground text-xs font-medium tracking-widest whitespace-nowrap uppercase">
                    {category.title}
                  </h2>
                  <Badge variant="outline" size="sm" className="font-mono tabular-nums">
                    {category.pins.length}
                  </Badge>
                </div>
                <Separator className="flex-1" />
              </div>
            </AccordionTrigger>
            <AccordionPanel className="pt-0 pb-6">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {category.pins.map((pin) => {
                  return (
                    <Link
                      key={pin.name}
                      href={pin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <CardFrame className="h-full">
                        <CardFrameFooter>
                          <div className="flex w-full items-center justify-between text-sm">
                            <span className="text-muted-foreground group-hover:text-foreground min-w-0 truncate text-xs font-medium tracking-wide uppercase transition-colors">
                              {pin.name}
                            </span>
                          </div>
                        </CardFrameFooter>
                      </CardFrame>
                    </Link>
                  )
                })}
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
