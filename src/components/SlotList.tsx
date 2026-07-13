import { format } from "date-fns";
import type { AvailabilitySlot } from "@/src/lib/types";

type SlotListProps = {
  slots: AvailabilitySlot[];
  selectedSlot: string | null;
  onSelect: (slotStart: string) => void;
  loading?: boolean;
};

export function SlotList({ slots, selectedSlot, onSelect, loading }: SlotListProps) {
  if (loading) {
    return <p className="text-sm text-white/60">Checking availability…</p>;
  }

  if (!slots.length) {
    return <p className="text-sm text-white/60">No slots found for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
      {slots.map((slot) => {
        const label = `${format(new Date(slot.start), "HH:mm")}`;
        const selected = selectedSlot === slot.start;

        return (
          <button
            type="button"
            key={slot.start}
            data-testid={`slot-${label}`}
            disabled={!slot.isAvailable}
            onClick={() => onSelect(slot.start)}
            className={`border px-3 py-3 text-xs tracking-[0.16em] uppercase transition ${
              slot.isAvailable
                ? selected
                  ? "border-white bg-white text-black"
                  : "border-white/25 bg-transparent hover:border-white/70"
                : "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/25 line-through"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
