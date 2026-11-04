"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  type FormEvent,
} from "react";
import { createBookingAction } from "@/app/book/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CheckoutState, CheckoutValues } from "@/lib/booking/checkout";

interface BookingFormProps {
  /** The booking being confirmed (hidden fields) and empty guest details. */
  initialValues: CheckoutValues;
}

export function BookingForm({ initialValues }: BookingFormProps) {
  const id = useId();
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(
    createBookingAction,
    { values: initialValues, fieldErrors: {} }
  );
  const { values, fieldErrors, formError } = state;

  // A second submit while one is in flight would queue a second booking. The
  // ref closes the gap before `pending` has re-rendered the disabled button.
  const inFlight = useRef(false);
  useEffect(() => {
    if (!pending) inFlight.current = false;
  }, [pending]);
  function guardDoubleSubmit(event: FormEvent<HTMLFormElement>) {
    if (inFlight.current) {
      event.preventDefault();
      return;
    }
    inFlight.current = true;
  }

  return (
    <form
      action={formAction}
      onSubmit={guardDoubleSubmit}
      noValidate
      className="grid gap-5"
    >
      <input type="hidden" name="roomId" value={values.roomId} />
      <input type="hidden" name="checkIn" value={values.checkIn} />
      <input type="hidden" name="checkOut" value={values.checkOut} />
      <input type="hidden" name="adults" value={values.adults} />
      <input type="hidden" name="children" value={values.children} />

      <FormField id={`${id}-name`} label="Full name" error={fieldErrors.name}>
        {(control) => (
          <Input
            {...control}
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            required
            className="h-11"
          />
        )}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={`${id}-email`} label="Email" error={fieldErrors.email}>
          {(control) => (
            <Input
              {...control}
              type="email"
              name="email"
              autoComplete="email"
              defaultValue={values.email}
              required
              className="h-11"
            />
          )}
        </FormField>
        <FormField id={`${id}-phone`} label="Phone" error={fieldErrors.phone}>
          {(control) => (
            <Input
              {...control}
              type="tel"
              name="phone"
              autoComplete="tel"
              defaultValue={values.phone}
              required
              className="h-11"
            />
          )}
        </FormField>
      </div>

      <FormField
        id={`${id}-requests`}
        label="Special requests (optional)"
        hint="Up to 500 characters. We'll do our best but can't guarantee requests."
        error={fieldErrors.specialRequests}
      >
        {(control) => (
          <Textarea
            {...control}
            name="specialRequests"
            defaultValue={values.specialRequests}
            maxLength={500}
          />
        )}
      </FormField>

      {formError ? (
        <p
          role="alert"
          className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {formError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        aria-busy={pending}
        className="h-12 w-full"
      >
        {pending ? "Confirming your booking…" : "Confirm booking"}
      </Button>
    </form>
  );
}
