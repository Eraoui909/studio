import React from "react"
import Link from "next/link"
import Image from "next/image"
import { personalData } from "@/lib/data"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/happy-face-bg-rm.png"
              alt="Logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Hamza Eraoui. All rights reserved.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {personalData.contact.social.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild>
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  )
}
