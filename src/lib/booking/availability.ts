import { addMinutes, formatISO, isBefore, parseISO, set } from "date-fns";
import { BOOKING_CONFIG } from "@/src/lib/booking/config";
import type { AvailabilitySlot, Booking } from "@/src/lib/types";

function hasOverlap(slotStart: Date, slotEnd: Date, booking: Booking): boolean {
  const bookingStart = parseISO(booking.startTime);
  const bookingEnd = addMinutes(parseISO(booking.endTime), BOOKING_CONFIG.bufferMinutes);
  return slotStart < bookingEnd && slotEnd > bookingStart;
}

export function calculateAvailability(date: Date, bookings: Booking[]): AvailabilitySlot[] {
  const dayStart = set(date, {
    hours: BOOKING_CONFIG.businessStartHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const dayEnd = set(date, {
    hours: BOOKING_CONFIG.businessEndHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const now = new Date();
  const slots: AvailabilitySlot[] = [];

  let cursor = dayStart;
  while (cursor < dayEnd) {
    const slotStart = cursor;
    const slotEnd = addMinutes(slotStart, BOOKING_CONFIG.slotIntervalMinutes);
    const inPast = isBefore(slotStart, now);
    const overlapping = bookings.some((booking) => hasOverlap(slotStart, slotEnd, booking));

    slots.push({
      start: formatISO(slotStart),
      end: formatISO(slotEnd),
      isAvailable: !inPast && !overlapping,
      reason: inPast ? "past" : overlapping ? "overlap" : undefined,
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
