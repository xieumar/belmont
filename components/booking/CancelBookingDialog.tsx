"use client";

import { useActionState } from "react";
import {
  cancelBookingAction,
  type CancelState,
} from "@/app/booking/[reference]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CancelBookingDialogProps {
  reference: string;
}

export function CancelBookingDialog({ reference }: CancelBookingDialogProps) {
  const [state, formAction, pending] = useActionState<CancelState, FormData>(
    cancelBookingAction,
    {}
  );

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" size="lg" />}>
        Cancel booking
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="reference" value={reference} />
          <DialogHeader>
            <DialogTitle>Cancel this booking?</DialogTitle>
            <DialogDescription>
              Booking {reference} will be cancelled and the room released. This
              can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>

          {state.error ? (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {state.error}
            </p>
          ) : null}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Keep booking
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              disabled={pending}
              aria-busy={pending}
            >
              {pending ? "Cancelling…" : "Yes, cancel booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
