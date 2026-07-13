import { addMinutes, formatISO, isBefore, parseISO, set } from "date-fns";
import { BOOKING_CONFIG } from "@/src/lib/booking/config";
import type { AvailabilitySlot, Booking, Service } from "@/src/lib/types";

function hasOverlap(slotStart: Date, slotEnd: Date, booking: Booking): boolean {
  const bookingStart = parseISO(booking.startTime);
  const bookingEnd = addMinutes(parseISO(booking.endTime), BOOKING_CONFIG.bufferMinutes);
  return slotStart < bookingEnd && slotEnd > bookingStart;
}

export function bookingsForSpace(
  bookings: Booking[],
  spaceId: string,
  services: Service[],
): Booking[] {
  const spaceByServiceId = new Map(services.map((service) => [service.id, service.spaceId]));
  return bookings.filter(
    (booking) => (booking.spaceId ?? spaceByServiceId.get(booking.serviceId)) === spaceId,
  );
}

export function businessDayEnd(date: Date): Date {
  return set(date, {
    hours: BOOKING_CONFIG.businessEndHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
}

export function calculateAvailability(
  date: Date,
  bookings: Booking[],
  durationMinutes: number = BOOKING_CONFIG.slotIntervalMinutes,
): AvailabilitySlot[] {
  const dayStart = set(date, {
    hours: BOOKING_CONFIG.businessStartHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const dayEnd = businessDayEnd(date);
  const now = new Date();
  const slots: AvailabilitySlot[] = [];

  let cursor = dayStart;
  while (cursor < dayEnd) {
    const slotStart = cursor;
    const slotEnd = addMinutes(slotStart, BOOKING_CONFIG.slotIntervalMinutes);
    const sessionEnd = addMinutes(slotStart, durationMinutes);
    const inPast = isBefore(slotStart, now);
    const outsideHours = sessionEnd > dayEnd;
    const overlapping = bookings.some((booking) => hasOverlap(slotStart, sessionEnd, booking));

    slots.push({
      start: formatISO(slotStart),
      end: formatISO(slotEnd),
      isAvailable: !inPast && !outsideHours && !overlapping,
      reason: inPast ? "past" : outsideHours ? "outside-hours" : overlapping ? "overlap" : undefined,
    });

    cursor = slotEnd;
  }

  return slots;
}

export function bookingRangeFromSlot(slotStartIso: string, durationMinutes: number): {
  startTime: string;
  endTime: string;
} {
  const slotStart = parseISO(slotStartIso);
  const end = addMinutes(slotStart, durationMinutes);
  return {
    startTime: formatISO(slotStart),
    endTime: formatISO(end),
  };
}
