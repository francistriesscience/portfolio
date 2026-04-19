type MDXContentProps = {
  html: string
}

export function MDXContent({ html }: MDXContentProps) {
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />
}
