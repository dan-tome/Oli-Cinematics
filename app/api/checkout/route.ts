import { addDays } from "date-fns";
import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingRangeFromSlot } from "@/src/lib/booking/availability";
import { BOOKING_CONFIG } from "@/src/lib/booking/config";
import { bookingsRepo } from "@/src/lib/repositories/bookingsRepo";
import { servicesRepo } from "@/src/lib/repositories/servicesRepo";
import { APP_URL, stripe } from "@/src/lib/stripe";

const bodySchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotStart: z.string().datetime(),
  customerEmail: z.string().email(),
});

function overlapsWithBuffer(
  startTime: string,
  endTime: string,
  booking: { startTime: string; endTime: string },
): boolean {
  const requestedStart = new Date(startTime).getTime();
  const requestedEnd = new Date(endTime).getTime();
  const bookedStart = new Date(booking.startTime).getTime();
  const bookedEndWithBuffer =
    new Date(booking.endTime).getTime() + BOOKING_CONFIG.bufferMinutes * 60 * 1000;

  return requestedStart < bookedEndWithBuffer && requestedEnd > bookedStart;
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const service = await servicesRepo.getById(parsed.data.serviceId);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const { startTime, endTime } = bookingRangeFromSlot(parsed.data.slotStart, service.durationMinutes);
  const day = new Date(`${parsed.data.date}T00:00:00`);
  const existingBookings = await bookingsRepo.listByDateRange(
    day.toISOString(),
    addDays(day, 1).toISOString(),
  );

  const hasConflict = existingBookings.some((booking) =>
    overlapsWithBuffer(startTime, endTime, booking),
  );
  if (hasConflict) {
    return NextResponse.json(
      { error: "Selected slot is no longer available." },
      { status: 409 },
    );
  }

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.data.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: service.price,
          product_data: {
            name: service.name,
            description: service.description,
          },
        },
      },
    ],
    metadata: {
      serviceId: service.id,
      slotStart: startTime,
      slotEnd: endTime,
      customerEmail: parsed.data.customerEmail,
    },
    success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/cancel`,
  });

  await bookingsRepo.create({
    customerEmail: parsed.data.customerEmail,
    serviceId: service.id,
    startTime,
    endTime,
    status: "pending",
    stripeSessionId: session.id,
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
