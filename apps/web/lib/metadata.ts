import { createMetadata } from "@packages/metadata"
import { Metadata } from "next"

export const siteConfig = {
  name: "Francis Ignacio",
  description:
    "Software Engineer and Technical Lead with 4+ years of experience designing and operating scalable backend systems, distributed architectures, and AI-powered products across startups and academia. Proven track record of owning end-to-end delivery, from architecture and cloud infrastructure to observability and growth, migrating legacy stacks, cutting latency, and enabling data-driven decisions for engineering, product, and business teams.",
  url: "https://francistries.science",
  ogImage: "https://francistries.science/og.png",
  links: {
    twitter: "https://twitter.com/francistriessci",
    github: "https://github.com/francistriesscience",
  },
}

export const metadata: Metadata = createMetadata({
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  ogImage: siteConfig.ogImage,
})
