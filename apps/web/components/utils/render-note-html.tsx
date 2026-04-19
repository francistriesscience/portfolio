import * as React from "react"
import { compile, run } from "@mdx-js/mdx"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { renderToStaticMarkup } from "react-dom/server"
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

type MdxComponentMap = Record<string, React.ComponentType<any>>

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
  table: (props: React.ComponentProps<"table">) => (
    <TypographyTable>
      <table {...props} />
    </TypographyTable>
  ),
  tbody: (props: React.ComponentProps<"tbody">) => <tbody {...props} />,
  td: (props: React.ComponentProps<"td">) => <td {...props} />,
  th: (props: React.ComponentProps<"th">) => <th {...props} />,
  thead: (props: React.ComponentProps<"thead">) => <thead {...props} />,
  tr: (props: React.ComponentProps<"tr">) => <tr {...props} />,
}

export async function renderNoteHtml(source: string) {
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

  return renderToStaticMarkup(
    <Content components={{ ...defaultComponents, ...noteMdxComponents }} />,
  )
}
