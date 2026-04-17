"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import * as React from "react"

export function Accordion(props: AccordionPrimitive.Root.Props): React.ReactElement {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}
