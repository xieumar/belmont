import type { PriceBreakdown as Price } from "@/lib/booking/types";
import { formatPrice } from "@/lib/utils";

interface PriceBreakdownProps {
  price: Price;
  className?: string;
}

export function PriceBreakdown({ price, className }: PriceBreakdownProps) {
  const money = (amount: number) => formatPrice(amount, price.currency);
  const nightsLabel = `${price.nights} ${price.nights === 1 ? "night" : "nights"}`;

  return (
    <dl className={className}>
      <div className="flex justify-between gap-4 py-1 text-sm text-neutral-600">
        <dt>
          {money(price.nightlyRate)} × {nightsLabel}
        </dt>
        <dd className="tabular-nums">{money(price.subtotal)}</dd>
      </div>
      {price.tax > 0 ? (
        <div className="flex justify-between gap-4 py-1 text-sm text-neutral-600">
          <dt>Taxes</dt>
          <dd className="tabular-nums">{money(price.tax)}</dd>
        </div>
      ) : null}
      {price.fees > 0 ? (
        <div className="flex justify-between gap-4 py-1 text-sm text-neutral-600">
          <dt>Fees</dt>
          <dd className="tabular-nums">{money(price.fees)}</dd>
        </div>
      ) : null}
      <div className="mt-2 flex justify-between gap-4 border-t border-neutral-200 pt-3 font-semibold text-neutral-900">
        <dt>Total</dt>
        <dd className="tabular-nums">{money(price.total)}</dd>
      </div>
    </dl>
  );
}
