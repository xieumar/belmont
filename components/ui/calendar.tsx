"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "cn";

/** Themes react-day-picker to the site palette (see `--rdp-*` variables). */
const theme = {
  "--rdp-accent-color": "#A98E67",
  "--rdp-accent-background-color": "#F1EBE2",
  "--rdp-day-height": "2.25rem",
  "--rdp-day-width": "2.25rem",
  "--rdp-day_button-height": "2.125rem",
  "--rdp-day_button-width": "2.125rem",
  "--rdp-nav-height": "2.25rem",
  "--rdp-nav_button-height": "2rem",
  "--rdp-nav_button-width": "2rem",
} as React.CSSProperties;

function Calendar({
  className,
  style,
  showOutsideDays = false,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("font-sans text-sm text-neutral-900", className)}
      style={{ ...theme, ...style }}
      {...props}
    />
  );
}

export { Calendar };
