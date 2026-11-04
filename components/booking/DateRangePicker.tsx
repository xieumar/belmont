"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hotel } from "@/data/hotel";
import {
  addDays,
  hotelToday,
  isValidDateString,
  nightsBetween,
} from "@/lib/booking/dates";
import { formatDate, pluralise } from "@/lib/booking/format";
import { cn } from "cn";

export interface DateRangeValue {
  checkIn: string;
  checkOut: string;
}

interface DateRangePickerProps extends Omit<
  React.ComponentProps<"button">,
  "value" | "onChange"
> {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}

/** `YYYY-MM-DD` to a local-midnight Date, which is what DayPicker works in. */
const toDate = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const toDateString = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

/**
 * One calendar for both dates: pick check-in, then check-out. Past days and
 * stays outside the hotel's limits can't be chosen.
 */
export function DateRangePicker({
  value,
  onChange,
  className,
  ...buttonProps
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  // The in-progress selection while only check-in has been picked.
  const [draft, setDraft] = useState<DateRange>();

  const today = hotelToday();
  const lastDay = addDays(today, hotel.maxAdvanceDays + hotel.maxStayNights);

  const complete =
    isValidDateString(value.checkIn) &&
    isValidDateString(value.checkOut) &&
    value.checkOut > value.checkIn;
  const selected: DateRange | undefined =
    draft ??
    (complete
      ? { from: toDate(value.checkIn), to: toDate(value.checkOut) }
      : undefined);

  function handleSelect(range: DateRange | undefined) {
    if (range?.from && range.to && range.to > range.from) {
      onChange({
        checkIn: toDateString(range.from),
        checkOut: toDateString(range.to),
      });
      setDraft(undefined);
      setOpen(false);
      return;
    }
    // Only check-in so far: keep the calendar open for check-out.
    setDraft(range?.from ? { from: range.from } : undefined);
  }

  const label = complete
    ? `${formatDate(value.checkIn)} – ${formatDate(value.checkOut)} · ${pluralise(
        nightsBetween(value.checkIn, value.checkOut),
        "night"
      )}`
    : "Select check-in and check-out";

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDraft(undefined);
      }}
    >
      <PopoverTrigger
        {...buttonProps}
        type="button"
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-left text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          !complete && "text-muted-foreground",
          className
        )}
      >
        <CalendarDays
          aria-hidden="true"
          className="size-4 shrink-0 text-[#A98E67]"
        />
        <span className="truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected?.from ?? toDate(today)}
          startMonth={toDate(today)}
          endMonth={toDate(lastDay)}
          disabled={{ before: toDate(today), after: toDate(lastDay) }}
          // Counts days in the range: 1 to maxStayNights nights.
          min={2}
          max={hotel.maxStayNights + 1}
          resetOnSelect
        />
        <p className="px-2 pb-1 pt-2 text-xs text-neutral-500">
          {draft?.from
            ? "Now choose your check-out date."
            : `Stays of up to ${hotel.maxStayNights} nights.`}
        </p>
      </PopoverContent>
    </Popover>
  );
}
