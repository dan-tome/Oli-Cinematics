export type ServiceCategory = "Studio" | "Photography" | "Video";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  durationMinutes: number;
};

export type Booking = {
  id: string;
  customerEmail: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  stripeSessionId?: string;
  createdAt: string;
};

export type AvailabilitySlot = {
  start: string;
  end: string;
  isAvailable: boolean;
  reason?: "outside-hours" | "overlap" | "past";
};
