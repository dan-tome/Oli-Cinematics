export type ServiceCategory = "Studio" | "Photography" | "Video" | "Audio";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Space = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  hourlyRate: number; // in cents
  capacity: string;
  sizeSqft: number;
  features: string[];
  amenities: string[];
  image: string;
  category: ServiceCategory;
};

export type Service = {
  id: string;
  spaceId: string;
  name: string;
  description: string;
  price: number; // in cents
  category: ServiceCategory;
  durationMinutes: number;
};

export type Booking = {
  id: string;
  customerEmail: string;
  serviceId: string;
  spaceId?: string;
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
