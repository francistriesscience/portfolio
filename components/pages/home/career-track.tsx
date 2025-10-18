"use client"

import * as React from "react"
import { SiDatacamp } from "react-icons/si"
import { RiLightbulbFlashLine } from "react-icons/ri"

import { Card, Progress } from "@/components/ui"
import { LightRaysBackground } from "@/components/ui/background/light-rays-background"
import { careerTrack } from "@/data/career-track"
export function CareerTrack() {
  return (
    <Card className="bg-datacamp-bg relative flex h-full w-full flex-col items-start !gap-1 overflow-hidden border-none p-3">
      <LightRaysBackground
        className="z-0"
        count={6}
        color="rgba(120,180,255,0.18)"
        blur={40}
        opacity={0.6}
        speed={12}
        length="60vh"
      />
      <div className="relative z-10 w-full">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-row items-center justify-start gap-2">
            <SiDatacamp className="text-datacamp size-4" />
            <span className="text-xs text-white uppercase">Career Track</span>
          </div>
          <div className="flex w-full flex-row items-center justify-end gap-1">
            <RiLightbulbFlashLine className="size-3" />
            <span className="text-xs text-white">{careerTrack.coursesLeft} courses left</span>
          </div>
        </div>
        <div className="mt-1 flex flex-col items-start">
          <h1 className="text-base text-white">{careerTrack.title}</h1>
          <span className="text-xs text-white">{careerTrack.description}</span>
        </div>
        <div className="mt-4 grid w-full items-start gap-2 lg:grid-cols-2 lg:items-center lg:gap-0">
          <div className="flex w-full flex-row items-center gap-2">
            <Progress value={careerTrack.percent} className="bg-datacamp max-w-xl" />
            <span className="text-muted-foreground text-xs">{careerTrack.percent}%</span>
          </div>
          <div className="flex flex-row items-center justify-end gap-2 uppercase">
            {careerTrack.technologies.map((tech: string) => (
              <span key={tech} className="text-xs text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
// ...existing code...
