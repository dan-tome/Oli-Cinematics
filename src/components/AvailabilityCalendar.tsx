type AvailabilityCalendarProps = {
  value: string;
  onChange: (nextDate: string) => void;
};

export function AvailabilityCalendar({ value, onChange }: AvailabilityCalendarProps) {
  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs tracking-[0.2em] text-white/70 uppercase">Choose date</label>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/40"
      />
    </div>
  );
}
