"use client";

import { useEffect, useMemo, useState } from "react";
import { AvailabilityCalendar } from "@/src/components/AvailabilityCalendar";
import { SlotList } from "@/src/components/SlotList";
import type { AvailabilitySlot, Service } from "@/src/lib/types";

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function BookingPanel() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(todayIsoDate);
  const [customerEmail, setCustomerEmail] = useState("");
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? null,
    [services, serviceId],
  );

  useEffect(() => {
    const loadServices = async () => {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data.services ?? []);
      if (data.services?.[0]?.id) {
        setServiceId(data.services[0].id);
      }
    };

    void loadServices();
  }, []);

  useEffect(() => {
    if (!serviceId || !date) {
      return;
    }

    const loadAvailability = async () => {
      setLoading(true);
      setError(null);
      setSelectedSlot(null);

      try {
        const response = await fetch(
          `/api/availability?date=${encodeURIComponent(date)}&serviceId=${encodeURIComponent(serviceId)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? "Unable to load availability");
          setSlots([]);
          return;
        }

        setSlots(data.slots ?? []);
      } catch {
        setError("Network error while loading availability.");
      } finally {
        setLoading(false);
      }
    };

    void loadAvailability();
  }, [date, serviceId]);

  const handleCheckout = async () => {
    if (!selectedSlot || !customerEmail || !selectedService) {
      setError("Select a service, slot, and valid email before checkout.");
      return;
    }

    setBookingLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          date,
          slotStart: selectedSlot,
          customerEmail,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) {
        setError(data.error ?? "Checkout session failed.");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setError("Network error while creating checkout session.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section className="content-shell space-y-8">
      <h1 className="text-3xl tracking-[0.2em] uppercase sm:text-4xl">Book The Studio</h1>
      <p className="muted-copy">
        Select your date and slot. A 30-minute buffer is automatically applied after each booking.
      </p>

      <div className="space-y-5 text-left">
        <div className="space-y-2">
          <label className="block text-xs tracking-[0.2em] text-white/70 uppercase">Service</label>
          <select
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
            className="w-full border border-white/20 bg-[#163b33] px-4 py-3 text-white outline-none focus:border-white/40"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} (${(service.price / 100).toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        <AvailabilityCalendar value={date} onChange={setDate} />

        <div className="space-y-2">
          <label className="block text-xs tracking-[0.2em] text-white/70 uppercase">Email</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            placeholder="client@example.com"
            className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/40"
          />
        </div>

        <SlotList
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
          loading={loading}
        />

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={!selectedSlot || !customerEmail || bookingLoading}
          className="w-full bg-white px-6 py-4 text-xs font-semibold tracking-[0.3em] text-[#163b33] uppercase disabled:cursor-not-allowed disabled:opacity-50"
        >
          {bookingLoading ? "Creating checkout..." : "Book Now"}
        </button>
      </div>
    </section>
  );
}
