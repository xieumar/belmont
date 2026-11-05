"use client";

import { useActionState, useId, useRef } from "react";
import { lookupBookingAction } from "@/app/manage-booking/actions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import type { LookupState } from "@/lib/booking/lookup";
import { useFocusFirstError } from "@/lib/hooks/use-focus-first-error";

const initialState: LookupState = {
  values: { reference: "", email: "" },
  fieldErrors: {},
};

export function ManageBookingForm() {
  const id = useId();
  const [state, formAction, pending] = useActionState<LookupState, FormData>(
    lookupBookingAction,
    initialState
  );
  const { values, fieldErrors, formError } = state;

  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(
    formRef,
    state,
    Boolean(formError) || Object.keys(fieldErrors).length > 0
  );

  return (
    <form ref={formRef} action={formAction} noValidate className="grid gap-5">
      <FormField
        id={`${id}-reference`}
        label="Booking reference"
        hint="Looks like BLM-ABC234. It's in your confirmation."
        error={fieldErrors.reference}
      >
        {(control) => (
          <Input
            {...control}
            name="reference"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            defaultValue={values.reference}
            required
            className="h-11 font-mono uppercase"
          />
        )}
      </FormField>

      <FormField
        id={`${id}-email`}
        label="Email used to book"
        error={fieldErrors.email}
      >
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

      {formError ? (
        <p
          role="alert"
          tabIndex={-1}
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
        {pending ? "Finding your booking…" : "Find my booking"}
      </Button>
    </form>
  );
}
