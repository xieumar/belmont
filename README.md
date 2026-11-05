# Belmont Hotel

![Belmont Hotel home page](public/readme_hero.png)

Website and room booking for Belmont Hotel, built with Next.js (App Router), React, Tailwind CSS and Firestore.

Guests can browse rooms, search by dates and guests, book a room, download a PDF confirmation, and later look up or cancel their booking with a reference and email.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Server Components and Server Actions) and React 19
- Tailwind CSS 4, shadcn-style UI primitives, Base UI, framer-motion
- Firestore through the Firebase Admin SDK (server only)
- zod for validation, pdf-lib for the PDF confirmation
- Vitest for tests, ESLint and Prettier, Husky and lint-staged for git hooks
- pnpm

## Getting started

Requirements: a current Node.js LTS and [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # then fill in the values below
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The marketing pages work without any configuration. Booking pages (`/book`, `/booking/...`, `/manage-booking`) and room availability need Firestore.

### Environment variables

All variables are server-only. Never prefix them with `NEXT_PUBLIC_`.

| Variable                  | Notes                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `FIREBASE_PROJECT_ID`     | Your Firebase project id                                                              |
| `FIREBASE_CLIENT_EMAIL`   | Service account email                                                                 |
| `FIREBASE_PRIVATE_KEY`    | Service account key. Keep the quotes; `\n` sequences are converted to newlines        |
| `FIRESTORE_EMULATOR_HOST` | Optional, for example `127.0.0.1:8080`. When set, the Admin SDK talks to the emulator |

Get the service account values from Firebase console, Project settings, Service accounts, Generate new private key.

### Using the Firestore emulator

Local development and the integration tests can use the emulator instead of a real project. It needs Java installed.

```bash
pnpm dlx firebase-tools emulators:start --only firestore
```

Then set `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080` and any `FIREBASE_PROJECT_ID` (for example `demo-belmont`) in `.env.local`. The client email and private key still need placeholder values.

Firestore rules and indexes live in `firestore.rules` and `firestore.indexes.json`.

## Scripts

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `pnpm dev`          | Start the dev server                                     |
| `pnpm build`        | Production build                                         |
| `pnpm start`        | Run the production build                                 |
| `pnpm test`         | Unit tests (Vitest, no database needed)                  |
| `pnpm test:int`     | Firestore integration tests (needs the emulator running) |
| `pnpm lint`         | ESLint                                                   |
| `pnpm format:check` | Check formatting (`pnpm format` to fix)                  |
| `pnpm type-check`   | TypeScript check                                         |

The pre-commit hook runs the format check, ESLint and the type check.

## Booking flow

```
/rooms ──search──> available rooms ──Book──> /book ──confirm──> /booking/[reference]
                                                                   │  download PDF
/manage-booking ──reference + email──────────────────────────────> │  cancel
```

| Route                      | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `/rooms`, `/rooms/[id]`    | Browse rooms; search by dates and guests to see availability and totals |
| `/book`                    | Checkout: guest details form and price summary                          |
| `/booking/[reference]`     | Confirmation and booking details, cancel button                         |
| `/booking/[reference]/pdf` | PDF download of the confirmation                                        |
| `/manage-booking`          | Look up a booking with its reference and email                          |
| `/terms`, `/privacy`       | Legal pages linked from checkout and the footer                         |

### How it works

- **Price is never taken from the client.** The server recomputes it from the room's rate and the stay when a booking is created.
- **No double booking.** Booking creation runs in a Firestore transaction over per-night inventory, so two guests cannot take the last room.
- **Booking access.** Details are shown only to someone who proves ownership. After booking or a successful lookup, a 30-minute httpOnly cookie lets that browser view the booking. A wrong email and an unknown reference give the same error.
- **Cancellation.** Free until 48 hours before check-in (3:00 PM hotel time). Cancelling is idempotent and releases the room. The cutoff and other rules are set in `data/hotel.ts` and applied on the server.
- **Payment.** None. Guests pay at the hotel.

### Where things live

```
app/                  routes, server actions, metadata
components/booking/   checkout, confirmation, lookup and cancel UI
components/rooms/     room list, cards, detail page sections
data/                 rooms and hotel configuration (rates, capacity, policy)
lib/booking/          pricing, dates, validation, policy, stores, PDF (unit tested)
lib/firebase/         server-only Firebase Admin setup
```

Booking logic sits behind a `BookingStore` interface (`lib/booking/store.ts`). Production uses `FirestoreBookingStore`; unit tests use `MemoryBookingStore`.

## Configuring rooms and policy

- Add or edit rooms in `data/rooms.ts`. Rates are in cents; `units` is the number of physical rooms of that type.
- Check-in and check-out times, currency, tax and fee rates, maximum stay and the cancellation window are in `data/hotel.ts`.

## Known limitations

- The manage-booking lookup is not rate limited.
- No payment, no confirmation emails and no admin view yet.
