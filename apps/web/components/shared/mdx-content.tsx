type MDXContentProps = {
  html: string
}

export function MDXContent({ html }: MDXContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
