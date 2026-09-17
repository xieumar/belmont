import { StaggerItem } from "@/components/ui/animations";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-12">
      <StaggerItem>
        <h2 className="mb-4 font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
          Get in touch
        </h2>
        <p className="font-sans text-neutral-600 leading-relaxed max-w-md">
          Our concierge team is available 24/7 to assist you with reservations,
          special requests, and any inquiries you may have.
        </p>
      </StaggerItem>

      <div className="flex flex-col gap-8">
        <StaggerItem>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terra-50 text-terra-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-serif text-xl font-medium text-neutral-900">
                Address
              </h3>
              <p className="font-sans text-neutral-600">
                Belmont Cove, Coastline Drive 108
                <br />
                Palo Alto, CA 94301
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terra-50 text-terra-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-serif text-xl font-medium text-neutral-900">
                Phone
              </h3>
              <p className="font-sans text-neutral-600">
                Reservations: +1 (800) 555-BELMONT
                <br />
                Front Desk: +1 (650) 555-0198
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terra-50 text-terra-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-serif text-xl font-medium text-neutral-900">
                Email
              </h3>
              <p className="font-sans text-neutral-600">
                concierge@belmonthotel.com
                <br />
                events@belmonthotel.com
              </p>
            </div>
          </div>
        </StaggerItem>
      </div>
    </div>
  );
}
