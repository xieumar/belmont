"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Manage Booking", href: "/manage-booking" },
  { label: "Facilities", href: "/facilities" },
  { label: "Dining & Bar", href: "/dining" },
  { label: "Our Story", href: "/about" },
];

const EXPERIENCES = [
  "Nature-Inspired Pool",
  "Private Beach Access",
  "Spa & Wellness",
  "Panoramic Sunset Lounge",
  "Curated Excursions",
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Concierge", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background pb-12 pt-16 print:hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground"
            >
              <Image
                src="/belmontLogo.png"
                alt="Belmont Hotel Logo"
                width={64}
                height={64}
                className="object-contain w-auto h-auto -translate-y-1"
              />
              <span className="translate-y-1">Belmont Hotel</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Unwind in a dreamy seaside haven. Indulge in the epitome of
              coastal living, tailored hospitality, and serene architectural
              sanctuaries.
            </p>
            <address className="mt-6 flex flex-col gap-2.5 not-italic">
              {[
                { icon: MapPin, text: "Belmont Cove, Coastline Drive 108" },
                { icon: Phone, text: "+1 (800) 555-BELMONT" },
                { icon: Mail, text: "concierge@belmonthotel.com" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {text}
                </div>
              ))}
            </address>
          </div>

          {/* Navigation col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-muted-foreground hover:text-foreground after:bg-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Experiences
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPERIENCES.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter col */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Privilege Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe for private seasonal offers, culinary previews, and
              retreat invitations.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 flex-1 rounded-full border border-border bg-muted px-4 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50"
              />
              <Button type="submit" variant="default" className="shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Belmont Hotel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-underline text-xs text-muted-foreground hover:text-foreground after:bg-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
