import type { ComponentProps } from "react"

import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { TypographyTable } from "@packages/ui/shared"

type MDXContentProps = {
  source: string
  components?: ComponentProps<typeof MDXRemote>["components"]
}

const defaultComponents: NonNullable<ComponentProps<typeof MDXRemote>["components"]> = {
  table: (props: ComponentProps<"table">) => (
    <TypographyTable>
      <table {...props} />
    </TypographyTable>
  ),
  thead: (props: ComponentProps<"thead">) => <thead {...props} />,
  tbody: (props: ComponentProps<"tbody">) => <tbody {...props} />,
  tr: (props: ComponentProps<"tr">) => <tr {...props} />,
  th: (props: ComponentProps<"th">) => <th {...props} />,
  td: (props: ComponentProps<"td">) => <td {...props} />,
}

export default async function MDXContent({ source, components }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
      components={{ ...defaultComponents, ...components }}
    />
  )
}
