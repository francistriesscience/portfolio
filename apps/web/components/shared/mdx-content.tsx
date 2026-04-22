import "server-only"

import * as React from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyHr,
  TypographyImage,
  TypographyInlineCode,
  TypographyLink,
  TypographyList,
  TypographyOrderedList,
  TypographyP,
  TypographyPre,
  TypographyTable,
} from "@packages/ui/shared"

type MdxComponentMap = Components

const noteMdxComponents: MdxComponentMap = {
  a: TypographyLink,
  blockquote: TypographyBlockquote,
  code: TypographyInlineCode,
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  hr: TypographyHr,
  img: TypographyImage,
  ol: TypographyOrderedList,
  p: TypographyP,
  pre: TypographyPre,
  ul: TypographyList,
}

const defaultComponents: MdxComponentMap = {
  table: (props: React.ComponentProps<"table">) =>
    React.createElement(TypographyTable, null, React.createElement("table", props)),
  tbody: (props: React.ComponentProps<"tbody">) => React.createElement("tbody", props),
  td: (props: React.ComponentProps<"td">) => React.createElement("td", props),
  th: (props: React.ComponentProps<"th">) => React.createElement("th", props),
  thead: (props: React.ComponentProps<"thead">) => React.createElement("thead", props),
  tr: (props: React.ComponentProps<"tr">) => React.createElement("tr", props),
}

type MDXContentProps = {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{ ...defaultComponents, ...noteMdxComponents }}
    >
      {source}
    </ReactMarkdown>
  )
}
