import "server-only"

import { compile, run } from "@mdx-js/mdx"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import * as React from "react"
import * as jsxRuntime from "react/jsx-runtime"

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

type MdxComponentMap = Record<string, React.ElementType>

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

export async function MDXContent({ source }: MDXContentProps) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  })

  const evaluated = await run(compiled, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
  })

  const Content = evaluated.default as React.ComponentType<{
    components?: MdxComponentMap
  }>

  return <Content components={{ ...defaultComponents, ...noteMdxComponents }} />
}
