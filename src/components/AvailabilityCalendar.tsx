type AvailabilityCalendarProps = {
  value: string;
  onChange: (nextDate: string) => void;
};

export function AvailabilityCalendar({ value, onChange }: AvailabilityCalendarProps) {
  return (
    <div className="space-y-3">
      <label className="eyebrow block">Date</label>
      <input
        type="date"
        data-testid="date-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-dark"
      />
      <p className="text-[11px] text-white/40">Studio hours 09:00 – 18:00 · 30-min changeover after each session.</p>
    </div>
  );
}
