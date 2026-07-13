import type { Booking } from "@/src/lib/types";

export const seedBookings: Booking[] = [
  {
    id: "book_987",
    customerEmail: "client@example.com",
    serviceId: "svc_studio-a_half",
    spaceId: "space_studio_a",
    startTime: "2026-06-10T10:00:00Z",
    endTime: "2026-06-10T14:00:00Z",
    status: "confirmed",
    stripeSessionId: "cs_test_abc123",
    createdAt: "2026-03-29T16:00:00Z",
  },
];
