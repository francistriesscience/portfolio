import { z } from "zod"

const DEFAULT_GITHUB_USERNAME = "francistriesscience"

const optionalEnvString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value
  }

  const trimmedValue = value.trim()
  return trimmedValue === "" ? undefined : trimmedValue
}, z.string().trim().min(1).optional())

const envSchema = z
  .object({
    GITHUB_PAT: optionalEnvString,
    GITHUB_TOKEN: optionalEnvString,
    GITHUB_USERNAME: optionalEnvString.default(DEFAULT_GITHUB_USERNAME),
  })
  .transform((values) => ({
    githubToken: values.GITHUB_TOKEN ?? values.GITHUB_PAT ?? null,
    githubUsername: values.GITHUB_USERNAME,
  }))

export const env = envSchema.parse(process.env)
