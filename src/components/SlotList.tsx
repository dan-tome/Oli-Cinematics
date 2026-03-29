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
    return <p className="text-sm text-white/70">Checking availability...</p>;
  }

  if (!slots.length) {
    return <p className="text-sm text-white/70">No slots found for this date.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {slots.map((slot) => {
        const label = `${format(new Date(slot.start), "HH:mm")} - ${format(new Date(slot.end), "HH:mm")}`;
        const selected = selectedSlot === slot.start;

        return (
          <button
            type="button"
            key={slot.start}
            disabled={!slot.isAvailable}
            onClick={() => onSelect(slot.start)}
            className={`border px-3 py-2 text-xs tracking-[0.1em] uppercase transition ${
              slot.isAvailable
                ? selected
                  ? "border-white bg-white text-[#163b33]"
                  : "border-white/30 bg-white/5 hover:border-white/60"
                : "cursor-not-allowed border-white/10 bg-white/5 text-white/35"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
