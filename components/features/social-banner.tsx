"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MailIcon } from "lucide-react"
import { RiLinkedinBoxFill, RiGitlabFill } from "react-icons/ri"

import { ButtonGroup, Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

export default function SocialBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)

        const timeout = setTimeout(() => {
          setIsVisible(true)
        }, 5000)

        setScrollTimeout(timeout)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [lastScrollY, scrollTimeout])

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-md shadow-sm transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" className="text-xs">
              <Link
                href="mailto:hello@francistries.science"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-2"
              >
                <MailIcon className="h-4 w-4" />
                hello@francistries.science
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send me an email</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" className="bg-gitlab hover:bg-gitlab/90">
              <Link
                href="https://gitlab.com/francistriesscience"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-2"
              >
                <RiGitlabFill size={16} className="text-white" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>gitlab.com/francistriesscience</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" className="bg-linkedin hover:bg-linkedin/90">
              <Link
                href="https://linkedin.com/in/francistriesscience"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-2"
              >
                <RiLinkedinBoxFill size={16} className="text-white" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>linkedin.com/in/francistriesscience</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
