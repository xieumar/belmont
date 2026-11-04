"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { GuestStepper } from "@/components/booking/GuestStepper";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import type { Room } from "@/data/rooms";
import { checkCapacity } from "@/lib/booking/capacity";
import { validateStayDates } from "@/lib/booking/dates";
import { STAY_DATES_MESSAGES } from "@/lib/booking/search";

export interface AvailabilitySearchValues {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

type RoomCapacity = Pick<Room, "maxAdults" | "maxChildren" | "maxGuests">;

interface AvailabilitySearchProps {
  /** Pre-filled values, e.g. the current search. */
  defaultValues?: Partial<AvailabilitySearchValues>;
  /** Page the search is submitted to. */
  action?: string;
  /** Element id to scroll to once the results have loaded. */
  resultsId?: string;
  /**
   * Capacities of the rooms being searched. Guest steppers stop where no room
   * could fit one more guest. Without it, only the schema's limit applies.
   */
  capacities?: RoomCapacity[];
  className?: string;
}

/** The schema's upper bound, used when no room capacities are given. */
const FALLBACK_MAX_PER_TYPE = 10;

export function AvailabilitySearch({
  defaultValues,
  action = "/rooms",
  resultsId,
  capacities,
  className,
}: AvailabilitySearchProps) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [dates, setDates] = useState({
    checkIn: defaultValues?.checkIn ?? "",
    checkOut: defaultValues?.checkOut ?? "",
  });
  const [adults, setAdults] = useState(defaultValues?.adults ?? 2);
  const [children, setChildren] = useState(defaultValues?.children ?? 0);
  const [error, setError] = useState<string>();

  const canFit = (a: number, c: number) =>
    capacities
      ? capacities.some(
          (room) => checkCapacity(room, { adults: a, children: c }) === null
        )
      : a <= FALLBACK_MAX_PER_TYPE && c <= FALLBACK_MAX_PER_TYPE;
  const maxGuestsPerRoom = capacities
    ? Math.max(...capacities.map((room) => room.maxGuests))
    : undefined;

  // Scroll to the results once the new search has finished loading.
  const wasPending = useRef(false);
  useEffect(() => {
    if (wasPending.current && !isPending && resultsId) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      document
        .getElementById(resultsId)
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
    wasPending.current = isPending;
  }, [isPending, resultsId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateStayDates(dates);
    if (problem) {
      setError(STAY_DATES_MESSAGES[problem]);
      return;
    }
    setError(undefined);
    const query = new URLSearchParams({
      ...dates,
      adults: String(adults),
      children: String(children),
    });
    startTransition(() => {
      router.push(`${action}?${query}${resultsId ? `#${resultsId}` : ""}`, {
        scroll: false,
      });
    });
  }

  return (
    <form
      // Without JavaScript this still works as a plain GET form.
      action={resultsId ? `${action}#${resultsId}` : action}
      method="get"
      noValidate
      onSubmit={handleSubmit}
      className={className}
    >
      <FormField id={`${id}-dates`} label="Dates" error={error}>
        {(control) => (
          <DateRangePicker
            {...control}
            value={dates}
            onChange={(next) => {
              setDates(next);
              setError(undefined);
            }}
          />
        )}
      </FormField>
      <input type="hidden" name="checkIn" value={dates.checkIn} />
      <input type="hidden" name="checkOut" value={dates.checkOut} />

      <div className="mt-4 grid gap-4">
        <GuestStepper
          name="adults"
          label="Adults"
          value={adults}
          min={1}
          canIncrease={canFit(adults + 1, children)}
          onChange={setAdults}
        />
        <GuestStepper
          name="children"
          label="Children"
          value={children}
          min={0}
          canIncrease={canFit(adults, children + 1)}
          onChange={setChildren}
        />
      </div>

      {maxGuestsPerRoom ? (
        <p className="mt-3 text-xs text-neutral-500">
          Our largest room sleeps up to {maxGuestsPerRoom} guests.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        aria-busy={isPending}
        className="mt-5 h-11 w-full"
      >
        {isPending ? "Checking availability…" : "Check availability"}
      </Button>
    </form>
  );
}
