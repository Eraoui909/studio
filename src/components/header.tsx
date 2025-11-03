
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { ImageWithFallback } from "./image-with-fallback"

const navLinks = [
  { href: "/#projects", label: "Projects", isSection: true },
  { href: "/blog", label: "Blog" },
  { href: "/opensource", label: "Open Source" },
  { href: "/archive", label: "Archive" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact", isSection: true },
  { href: "/#services", label: "Services", isSection: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (pathname !== '/') {
        setIsMenuOpen(false);
        return;
    }

    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logos/web-app-manifest-192x192.png"
              alt="Site Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold font-headline sm:inline-block">
              Eraoui.dev
            </span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const href = (pathname !== '/' && link.isSection) ? `/${link.href.substring(1)}` : link.href;
            return (
              <Link
                key={link.href}
                href={href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button
            variant="outline"
            className="hidden sm:flex"
            onClick={() => {
              // This is a placeholder for opening the terminal.
              // The actual terminal logic is in the Terminal component itself.
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}
          >
            <span className="text-sm text-muted-foreground">Cmd + K</span>
          </Button>
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                 <Image 
                  src="/logos/web-app-manifest-192x192.png"
                  alt="Site Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="ml-2 font-bold font-headline">Eraoui.dev</span>
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const href = (pathname !== '/' && link.isSection) ? `/${link.href.substring(1)}` : link.href;
                  return (
                  <Link
                    key={link.href}
                    href={href}
                    className="text-lg"
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                )})}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
