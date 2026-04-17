"use client"

import * as React from "react"
import { IconChevronDown } from "@tabler/icons-react"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Badge,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Separator,
} from "@packages/ui/shared"
import { cn } from "@packages/ui/lib/utils"
import { FORMER_ROLES } from "@portfolio/web/data/former-roles"

import { buttonVariants } from "@packages/ui/shared/variants"

export function FormerRoles() {
  return (
    <Collapsible className="group/collapsible flex w-full flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
            And previously
          </h2>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {FORMER_ROLES.length}
          </Badge>
        </div>
        <Separator className="flex-1" />
        <CollapsibleTrigger
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-xs" }),
            "group/trigger h-7 w-7 sm:h-6 sm:w-6",
          )}
        >
          <IconChevronDown className="transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      </div>

      <CollapsiblePanel>
        <Accordion className="w-full">
          {FORMER_ROLES.map((role) => (
            <AccordionItem key={role.id} value={role.id} className="border-none">
              <AccordionTrigger className="px-0 py-4 outline-none hover:no-underline">
                <div className="flex w-full items-start justify-between pr-4 text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-foreground font-medium underline-offset-4 group-hover:underline">
                      {role.role}
                    </h3>
                    <p className="text-muted-foreground text-xs">{role.years}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground text-sm font-medium">{role.company}</p>
                    <p className="text-muted-foreground text-xs">{role.location}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionPanel className="pt-0 pb-6">
                <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
                  {role.description}
                </p>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsiblePanel>
    </Collapsible>
  )
}
