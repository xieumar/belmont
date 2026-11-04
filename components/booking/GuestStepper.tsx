"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestStepperProps {
  /** Form field name, so the value is submitted with a plain GET form. */
  name: string;
  label: string;
  description?: string;
  value: number;
  min: number;
  /** False once one more guest would not fit in any room. */
  canIncrease: boolean;
  onChange: (value: number) => void;
}

export function GuestStepper({
  name,
  label,
  description,
  value,
  min,
  canIncrease,
  onChange,
}: GuestStepperProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        {description ? (
          <p className="text-xs text-neutral-500">{description}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus aria-hidden="true" />
        </Button>
        <span
          className="w-6 text-center font-sans text-base font-semibold tabular-nums text-neutral-900"
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
          <span className="sr-only"> {label.toLowerCase()}</span>
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={!canIncrease}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </Button>
        <input type="hidden" name={name} value={value} />
      </div>
    </div>
  );
}
