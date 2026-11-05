import { useEffect, type RefObject } from "react";

/**
 * Moves keyboard and screen-reader focus to the first invalid field after a
 * failed submit, or to the form-level alert when no single field is at fault.
 * `state` should be a new object for each submit result so the same error
 * twice in a row still re-focuses.
 */
export function useFocusFirstError(
  formRef: RefObject<HTMLFormElement | null>,
  state: unknown,
  hasError: boolean
) {
  useEffect(() => {
    if (!hasError) return;
    const form = formRef.current;
    if (!form) return;
    const target =
      form.querySelector<HTMLElement>('[aria-invalid="true"]') ??
      form.querySelector<HTMLElement>('[role="alert"]');
    target?.focus();
  }, [formRef, state, hasError]);
}
