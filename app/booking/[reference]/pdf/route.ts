import { cookies } from "next/headers";
import { getRoomById } from "@/data/rooms";
import { bookingAccessCookieName } from "@/lib/booking/access";
import { getStore } from "@/lib/booking/get-store";
import { renderBookingPdf } from "@/lib/booking/pdf";
import { REFERENCE_PATTERN } from "@/lib/booking/reference";

const notFound = () => new Response("Not found", { status: 404 });

/**
 * Downloads the booking confirmation as a PDF. Guarded exactly like the
 * confirmation page: only the browser holding the booking's access cookie
 * gets it, and everyone else sees the same 404 whether or not it exists.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  const reference = (await params).reference.toUpperCase();
  if (!REFERENCE_PATTERN.test(reference)) return notFound();

  const email = (await cookies()).get(
    bookingAccessCookieName(reference)
  )?.value;
  if (!email) return notFound();

  try {
    const booking = await getStore().getByReference(reference, email);
    if (!booking) return notFound();

    const pdf = await renderBookingPdf(
      booking,
      getRoomById(booking.roomId)?.name
    );
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="belmont-booking-${booking.reference}.pdf"`,
        // Contains personal details: never store it in a shared cache.
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Failed to generate booking PDF", error);
    return new Response("Could not generate the PDF", { status: 500 });
  }
}
