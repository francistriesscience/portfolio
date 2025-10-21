import { ComponentType } from "react"
import { ChartNoAxesColumnIcon, BrainIcon, CodeXmlIcon } from "lucide-react"

import {
  PythonIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  GoIcon,
  TensorFlowIcon,
  PyTorchIcon,
  DjangoIcon,
  NextJsIcon,
  NodeJsIcon,
  HonoIcon,
  PostgreSQLIcon,
  DockerIcon,
  AWSIcon,
  CloudflareIcon,
  DigitalOceanIcon,
  GitLabIcon,
  GraphQLIcon,
  JupyterIcon,
  ScikitLearnIcon,
  AWSSageMakerIcon,
  GoogleColabIcon,
} from "@/components/ui"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  PythonIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  GoIcon,
  TensorFlowIcon,
  PyTorchIcon,
  DjangoIcon,
  NextJsIcon,
  NodeJsIcon,
  HonoIcon,
  PostgreSQLIcon,
  DockerIcon,
  AWSIcon,
  CloudflareIcon,
  DigitalOceanIcon,
  GitLabIcon,
  GraphQLIcon,
  JupyterIcon,
  ScikitLearnIcon,
  AWSSageMakerIcon,
  GoogleColabIcon,
  ChartNoAxesColumnIcon,
  BrainIcon,
  CodeXmlIcon,
}

const languageIconMap: Record<string, string> = {
  python: "PythonIcon",
  typescript: "TypeScriptIcon",
  javascript: "JavaScriptIcon",
  go: "GoIcon",
  tensorflow: "TensorFlowIcon",
  pytorch: "PyTorchIcon",
  django: "DjangoIcon",
  nextjs: "NextJsIcon",
  nodejs: "NodeJsIcon",
  hono: "HonoIcon",
  postgresql: "PostgreSQLIcon",
  docker: "DockerIcon",
  aws: "AWSIcon",
  cloudflare: "CloudflareIcon",
  digitalocean: "DigitalOceanIcon",
  gitlab: "GitLabIcon",
  graphql: "GraphQLIcon",
  jupyter: "JupyterIcon",
  scikit: "ScikitLearnIcon",
  sagemaker: "AWSSageMakerIcon",
  colab: "GoogleColabIcon",
  sql: "PostgreSQLIcon",
  bash: "CodeXmlIcon",
  shell: "CodeXmlIcon",
  json: "CodeXmlIcon",
  yaml: "CodeXmlIcon",
  yml: "CodeXmlIcon",
}

export function getIconComponent(iconName?: string): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  return iconMap[iconName] || null
}

export function getLanguageIcon(language: string): ComponentType<{ className?: string }> | null {
  const iconName = languageIconMap[language.toLowerCase()]
  return iconMap[iconName] || null
}
