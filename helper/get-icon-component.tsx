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
  ChartNoAxesColumnIcon,
  BrainIcon,
  CodeXmlIcon,
  GoogleColabIcon,
}

export function getIconComponent(iconName?: string): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  return iconMap[iconName] || null
}
