"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { label: "Facilities", href: "/facilities" },
  { label: "About", href: "/about" },
  { label: "Dining", href: "/dining" },
  { label: "Rooms", href: "/rooms" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          <Image
            src="/belmontLogo.png"
            alt="Belmont Hotel Logo"
            width={64}
            height={64}
            className="object-contain -translate-y-1"
          />
          <span className="translate-y-1">Belmont Hotel</span>
        </Link>

        {/* Desktop nav — hidden below lg */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground after:bg-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/rooms"
              className={buttonVariants({ variant: "default" })}
            >
              Book now
            </Link>
          </div>
        </div>

        {/* Hamburger — visible below lg (tablet + mobile) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex lg:hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      {open && (
        <nav className="lg:hidden border-t border-border bg-background px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground after:bg-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
            <Link
              href="/rooms"
              onClick={() => setOpen(false)}
              className={buttonVariants({
                variant: "default",
                className: "w-full",
              })}
            >
              Book now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
