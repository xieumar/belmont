"use client";

import { StaggerItem } from "@/components/ui/animations";
import { buttonVariants } from "@/components/ui/button";

export function ContactForm() {
  return (
    <StaggerItem className="w-full">
      <div className="bg-neutral-50 p-8 sm:p-10 lg:p-12 rounded-[2rem] border border-neutral-100 shadow-sm">
        <h3 className="mb-6 font-serif text-2xl font-medium text-neutral-900">
          Send a Message
        </h3>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-neutral-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Jane"
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-colors focus:border-terra-400 focus:ring-1 focus:ring-terra-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-neutral-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-colors focus:border-terra-400 focus:ring-1 focus:ring-terra-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="jane@example.com"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-colors focus:border-terra-400 focus:ring-1 focus:ring-terra-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-neutral-700"
            >
              Subject
            </label>
            <select
              id="subject"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-colors focus:border-terra-400 focus:ring-1 focus:ring-terra-400"
            >
              <option value="">Select a subject...</option>
              <option value="reservation">Reservation Inquiry</option>
              <option value="events">Weddings & Events</option>
              <option value="feedback">Guest Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-neutral-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="How can we help you?"
              className="w-full rounded-xl border border-neutral-200 bg-white p-4 text-sm outline-none transition-colors focus:border-terra-400 focus:ring-1 focus:ring-terra-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "mt-2 w-full sm:w-auto self-start rounded-full bg-terra-500 hover:bg-terra-600 text-white",
            })}
          >
            Send Message
          </button>
        </form>
      </div>
    </StaggerItem>
  );
}
