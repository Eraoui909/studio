
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code, Menu, Command as CommandIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/opensource", label: "Open Source" },
  { href: "/resume", label: "Resume" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsTerminalOpen((open) => !open)
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Eraoui.dev
            </span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button
            variant="outline"
            className="hidden sm:flex"
            onClick={() => setIsTerminalOpen(true)}
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
                <Code className="h-6 w-6 text-primary" />
                <span className="ml-2 font-bold font-headline">Eraoui.dev</span>
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg"
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
