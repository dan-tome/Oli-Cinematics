import { seedBookings } from "@/src/data/bookings";
import type { Booking, BookingStatus } from "@/src/lib/types";

export interface CreateBookingInput {
  customerEmail: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  stripeSessionId?: string;
}

export interface BookingsRepo {
  listByDate(date: string): Promise<Booking[]>;
  listByDateRange(startIso: string, endIso: string): Promise<Booking[]>;
  create(input: CreateBookingInput): Promise<Booking>;
  updateStatusByStripeSessionId(
    stripeSessionId: string,
    status: BookingStatus,
  ): Promise<Booking | null>;
}

class InMemoryBookingsRepo implements BookingsRepo {
  private readonly bookings: Booking[] = [...seedBookings];

  async listByDate(date: string): Promise<Booking[]> {
    return this.bookings.filter((booking) => booking.startTime.startsWith(date));
  }

  async listByDateRange(startIso: string, endIso: string): Promise<Booking[]> {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();

    return this.bookings.filter((booking) => {
      const bookingStart = new Date(booking.startTime).getTime();
      return bookingStart >= start && bookingStart < end;
    });
  }

  async create(input: CreateBookingInput): Promise<Booking> {
    const booking: Booking = {
      id: `book_${crypto.randomUUID()}`,
      customerEmail: input.customerEmail,
      serviceId: input.serviceId,
      startTime: input.startTime,
      endTime: input.endTime,
      status: input.status,
      stripeSessionId: input.stripeSessionId,
      createdAt: new Date().toISOString(),
    };

    this.bookings.push(booking);
    return booking;
  }

  async updateStatusByStripeSessionId(
    stripeSessionId: string,
    status: BookingStatus,
  ): Promise<Booking | null> {
    const booking = this.bookings.find((item) => item.stripeSessionId === stripeSessionId);

    if (!booking) {
      return null;
    }

    booking.status = status;
    return booking;
  }
}

export const bookingsRepo: BookingsRepo = new InMemoryBookingsRepo();
