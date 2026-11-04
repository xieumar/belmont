"use client";

import { useId, useState, type FormEvent } from "react";
import { GuestStepper } from "@/components/booking/GuestStepper";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  addDays,
  hotelToday,
  isValidDateString,
  validateStayDates,
} from "@/lib/booking/dates";
import { STAY_DATES_MESSAGES } from "@/lib/booking/search";

export interface AvailabilitySearchValues {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

interface AvailabilitySearchProps {
  /** Pre-filled values, e.g. the current search. */
  defaultValues?: Partial<AvailabilitySearchValues>;
  /** Where the GET form submits to. */
  action?: string;
  className?: string;
}

const MAX_GUESTS_PER_TYPE = 10;

export function AvailabilitySearch({
  defaultValues,
  action = "/rooms",
  className,
}: AvailabilitySearchProps) {
  const id = useId();
  const [checkIn, setCheckIn] = useState(defaultValues?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(defaultValues?.checkOut ?? "");
  const [adults, setAdults] = useState(defaultValues?.adults ?? 2);
  const [children, setChildren] = useState(defaultValues?.children ?? 0);
  const [error, setError] = useState<string>();

  const today = hotelToday();
  const checkOutMin = isValidDateString(checkIn) ? addDays(checkIn, 1) : today;

  function handleCheckIn(value: string) {
    setCheckIn(value);
    setError(undefined);
    // Keep the stay valid: check-out must stay after the new check-in.
    if (isValidDateString(value) && checkOut && checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const problem = validateStayDates({ checkIn, checkOut });
    if (problem) {
      event.preventDefault();
      setError(STAY_DATES_MESSAGES[problem]);
    }
  }

  return (
    <form
      action={action}
      method="get"
      noValidate
      onSubmit={handleSubmit}
      className={className}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id={`${id}-check-in`} label="Check-in">
          {(control) => (
            <Input
              {...control}
              type="date"
              name="checkIn"
              required
              min={today}
              value={checkIn}
              onChange={(event) => handleCheckIn(event.target.value)}
              className="h-10"
            />
          )}
        </FormField>
        <FormField id={`${id}-check-out`} label="Check-out">
          {(control) => (
            <Input
              {...control}
              type="date"
              name="checkOut"
              required
              min={checkOutMin}
              value={checkOut}
              onChange={(event) => {
                setCheckOut(event.target.value);
                setError(undefined);
              }}
              className="h-10"
            />
          )}
        </FormField>
      </div>

      <div className="mt-4 grid gap-4">
        <GuestStepper
          name="adults"
          label="Adults"
          value={adults}
          min={1}
          max={MAX_GUESTS_PER_TYPE}
          onChange={setAdults}
        />
        <GuestStepper
          name="children"
          label="Children"
          value={children}
          min={0}
          max={MAX_GUESTS_PER_TYPE}
          onChange={setChildren}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-5 h-11 w-full">
        Check availability
      </Button>
    </form>
  );
}
