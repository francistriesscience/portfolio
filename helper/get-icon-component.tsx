import { ComponentType } from "react"
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
}

export function getIconComponent(iconName?: string): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  return iconMap[iconName] || null
}
