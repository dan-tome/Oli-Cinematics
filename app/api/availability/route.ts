import { addDays, format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateAvailability } from "@/src/lib/booking/availability";
import { bookingsRepo } from "@/src/lib/repositories/bookingsRepo";
import { servicesRepo } from "@/src/lib/repositories/servicesRepo";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  serviceId: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    date: request.nextUrl.searchParams.get("date"),
    serviceId: request.nextUrl.searchParams.get("serviceId"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const service = await servicesRepo.getById(parsed.data.serviceId);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const day = new Date(`${parsed.data.date}T00:00:00`);
  if (Number.isNaN(day.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const startIso = day.toISOString();
  const endIso = addDays(day, 1).toISOString();
  const bookings = await bookingsRepo.listByDateRange(startIso, endIso);
  const slots = calculateAvailability(day, bookings);

  return NextResponse.json({
    date: format(day, "yyyy-MM-dd"),
    serviceId: service.id,
    slots,
  });
}
