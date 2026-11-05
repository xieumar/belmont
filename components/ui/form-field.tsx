import * as React from "react";
import { cn } from "cn";
import { Label } from "@/components/ui/label";

/** Props to spread on the control so it is linked to its label, hint and error. */
export interface FormFieldControlProps {
  id: string;
  "aria-invalid": boolean | undefined;
  "aria-describedby": string | undefined;
}

interface FormFieldProps {
  /** Used as the control's id; the hint and error ids derive from it. */
  id: string;
  label: React.ReactNode;
  /** Validation message. When set the control is marked invalid. */
  error?: string;
  hint?: React.ReactNode;
  className?: string;
  /** Render the control with the accessibility props spread onto it. */
  children: (control: FormFieldControlProps) => React.ReactNode;
}

function FormField({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div data-slot="form-field" className={cn("grid gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { FormField };
