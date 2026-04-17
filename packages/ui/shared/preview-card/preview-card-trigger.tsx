"use client"

import * as React from "react"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

export function PreviewCardTrigger({
  ...props
}: PreviewCardPrimitive.Trigger.Props): React.ReactElement {
  return <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
}
