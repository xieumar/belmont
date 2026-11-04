interface SearchNoticeProps {
  /** Why the visitor's search can't be shown, if it can't. */
  message?: string;
}

export function SearchNotice({ message }: SearchNoticeProps) {
  if (!message) return null;
  return (
    <p
      role="status"
      className="mb-10 rounded-2xl border border-[#A98E67]/40 bg-[#F8F6F3] px-5 py-4 text-sm text-neutral-700 sm:text-base"
    >
      {message}
    </p>
  );
}
