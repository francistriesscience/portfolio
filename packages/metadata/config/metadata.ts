import type { Metadata } from "next"

import { baseKeywords } from "./keywords"
export { baseKeywords } from "./keywords"

const defaultDescription =
  "Software Engineer and Technical Lead with 4+ years of experience designing and operating scalable backend systems, distributed architectures, and AI-powered products across startups and academia. Proven track record of owning end-to-end delivery, from architecture and cloud infrastructure to observability and growth, migrating legacy stacks, cutting latency, and enabling data-driven decisions for engineering, product, and business teams."
const defaultUrl = "https://francistries.science"

export interface MetadataConfig extends Omit<Metadata, "description" | "keywords"> {
  name: string
  url?: string
  ogImage?: string
  description?: string
  keywords?: string[]
}

export function createMetadata(config: MetadataConfig): Metadata {
  const {
    name,
    url = defaultUrl,
    ogImage = `${url}/og.png`,
    description = defaultDescription,
    keywords = baseKeywords,
    ...rest
  } = config

  return {
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description,
    keywords,
    authors: [
      {
        name: "Francis Ignacio",
        url,
      },
    ],
    creator: "Francis Ignacio",
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: name,
      description,
      siteName: name,
      ...(config.openGraph || {}),
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [ogImage],
      creator: "@mnemora",
      ...(config.twitter || {}),
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${url}/site.webmanifest`,
    ...rest,
  }
}
