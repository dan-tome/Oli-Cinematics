"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AvailabilityCalendar } from "@/src/components/AvailabilityCalendar";
import { SlotList } from "@/src/components/SlotList";
import type { AvailabilitySlot, Service, Space } from "@/src/lib/types";

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function BookingPanel() {
  const searchParams = useSearchParams();
  const initialSpace = searchParams.get("space");

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(todayIsoDate);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSpace = useMemo(
    () => spaces.find((s) => s.id === selectedSpaceId) ?? null,
    [spaces, selectedSpaceId],
  );

  const spaceServices = useMemo(
    () => services.filter((svc) => svc.spaceId === selectedSpaceId),
    [services, selectedSpaceId],
  );

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) ?? null,
    [services, serviceId],
  );

  // load spaces + services once
  useEffect(() => {
    const loadData = async () => {
      try {
        const [spRes, svRes] = await Promise.all([
          fetch("/api/spaces").then((r) => r.json()),
          fetch("/api/services").then((r) => r.json()),
        ]);
        const spList: Space[] = spRes.spaces ?? [];
        const svList: Service[] = svRes.services ?? [];
        setSpaces(spList);
        setServices(svList);

        const preselect = initialSpace
          ? spList.find((s) => s.slug === initialSpace)?.id
          : spList[0]?.id;
        if (preselect) setSelectedSpaceId(preselect);
      } catch {
        setError("Unable to load the studios right now. Please refresh and try again.");
      }
    };
    void loadData();
  }, [initialSpace]);

  // auto-pick first service for selected space
  useEffect(() => {
    if (!selectedSpaceId) return;
    const first = services.find((svc) => svc.spaceId === selectedSpaceId);
    setServiceId(first?.id ?? "");
    setSelectedSlot(null);
  }, [selectedSpaceId, services]);

  // load availability
  useEffect(() => {
    if (!serviceId || !date) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      setSelectedSlot(null);
      try {
        const res = await fetch(
          `/api/availability?date=${encodeURIComponent(date)}&serviceId=${encodeURIComponent(serviceId)}`,
        );
        const data = await res.json();
        if (!res.ok) {
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
    void load();
  }, [date, serviceId]);

  const handleCheckout = async () => {
    if (!selectedSlot || !customerEmail || !selectedService) {
      setError("Complete every step before checkout.");
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
          customerName: customerName || undefined,
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

  const stepDone = {
    space: !!selectedSpaceId,
    service: !!serviceId,
    slot: !!selectedSlot,
    contact: !!customerEmail,
  };

  return (
    <section className="content-shell !pt-10">
      <div className="max-w-[760px]">
        <span className="eyebrow">Reserve a space</span>
        <h1 className="mt-4 text-4xl sm:text-5xl" data-testid="book-heading">Book your studio</h1>
        <p className="muted-copy mt-5">
          Pick a room, choose your package, then lock in a time. A 30-minute changeover buffer is added
          automatically after every session.
        </p>
      </div>

      {/* Step 1: Space */}
      <div className="mt-14">
        <div className="flex items-center gap-4">
          <StepBadge index={1} done={stepDone.space} />
          <h2 className="text-2xl">Choose a space</h2>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-testid="space-picker">
          {spaces.map((space) => {
            const active = space.id === selectedSpaceId;
            return (
              <button
                key={space.id}
                type="button"
                data-testid={`space-option-${space.slug}`}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`text-left overflow-hidden border transition ${
                  active ? "border-white bg-white/5" : "border-white/10 bg-[#0a0a0a] hover:border-white/40"
                }`}
              >
                <div className="relative h-[140px] w-full overflow-hidden bg-black">
                  <Image
                    src={space.image}
                    alt={space.name}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="eyebrow">{space.tagline}</p>
                  <p className="mt-1 text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{space.name}</p>
                  <p className="mt-1 text-[11px] tracking-[0.24em] uppercase text-white/60">
                    ${(space.hourlyRate / 100).toFixed(0)}/hr
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Service (Package) */}
      {selectedSpace && (
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <StepBadge index={2} done={stepDone.service} />
            <h2 className="text-2xl">Pick your package</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="service-picker">
            {spaceServices.map((svc) => {
              const active = svc.id === serviceId;
              const hours = Math.round(svc.durationMinutes / 60);
              return (
                <button
                  key={svc.id}
                  type="button"
                  data-testid={`service-option-${svc.id}`}
                  onClick={() => setServiceId(svc.id)}
                  className={`text-left border p-6 transition ${
                    active ? "border-white bg-white/5" : "border-white/10 bg-[#0a0a0a] hover:border-white/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                      {svc.name.split("—")[1]?.trim() ?? svc.name}
                    </p>
                    <span className="text-sm tracking-[0.2em] uppercase text-white/80">
                      ${(svc.price / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="muted-copy mt-2 text-sm">{hours}-hour session · {svc.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Date + Slot */}
      {serviceId && (
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <StepBadge index={3} done={stepDone.slot} />
            <h2 className="text-2xl">Choose a time</h2>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div>
              <AvailabilityCalendar value={date} onChange={setDate} />
            </div>
            <div data-testid="slot-picker">
              <SlotList
                slots={slots}
                selectedSlot={selectedSlot}
                onSelect={setSelectedSlot}
                loading={loading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact + Checkout */}
      {selectedSlot && (
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <StepBadge index={4} done={stepDone.contact} />
            <h2 className="text-2xl">Your details</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow mb-2 block">Full name</label>
              <input
                className="input-dark"
                data-testid="input-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Alex Morgan"
              />
            </div>
            <div>
              <label className="eyebrow mb-2 block">Email</label>
              <input
                type="email"
                className="input-dark"
                data-testid="input-email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {selectedService && selectedSpace && (
            <div className="mt-8 border border-white/10 bg-[#0a0a0a] p-6" data-testid="booking-summary">
              <p className="eyebrow">Summary</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div><span className="text-white/50 uppercase text-[10px] tracking-[0.28em]">Space</span><p className="mt-1">{selectedSpace.name}</p></div>
                <div><span className="text-white/50 uppercase text-[10px] tracking-[0.28em]">Package</span><p className="mt-1">{selectedService.name.split("—")[1]?.trim() ?? selectedService.name}</p></div>
                <div><span className="text-white/50 uppercase text-[10px] tracking-[0.28em]">Date</span><p className="mt-1">{date}</p></div>
                <div><span className="text-white/50 uppercase text-[10px] tracking-[0.28em]">Total</span><p className="mt-1">${(selectedService.price / 100).toFixed(2)}</p></div>
              </div>
            </div>
          )}

          {error ? <p className="mt-4 text-sm text-red-300" data-testid="booking-error">{error}</p> : null}

          <button
            type="button"
            data-testid="checkout-btn"
            onClick={handleCheckout}
            disabled={!selectedSlot || !customerEmail || bookingLoading}
            className="btn-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            {bookingLoading ? "Creating checkout…" : "Reserve & Pay"}
          </button>
        </div>
      )}

      {error && !selectedSlot ? (
        <p className="mt-4 text-sm text-red-300" data-testid="booking-error-top">{error}</p>
      ) : null}
    </section>
  );
}

function StepBadge({ index, done }: { index: number; done: boolean }) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-[11px] tracking-[0.2em] uppercase transition ${
        done ? "border-white bg-white text-black" : "border-white/30 text-white/70"
      }`}
    >
      {done ? "✓" : index}
    </span>
  );
}
