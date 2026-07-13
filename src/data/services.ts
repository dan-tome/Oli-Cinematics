import type { Service } from "@/src/lib/types";
import { seedSpaces } from "@/src/data/spaces";

// Booking packages per space. Prices are hourlyRate * duration.
type PackageTemplate = {
  key: string;
  label: string;
  durationMinutes: number;
  descriptor: string;
};

const packages: PackageTemplate[] = [
  { key: "half", label: "Half Day", durationMinutes: 240, descriptor: "4-hour block" },
  { key: "full", label: "Full Day", durationMinutes: 480, descriptor: "8-hour block" },
];

export const seedServices: Service[] = seedSpaces.flatMap((space) =>
  packages.map((pkg) => ({
    id: `svc_${space.slug}_${pkg.key}`,
    spaceId: space.id,
    name: `${space.name} — ${pkg.label}`,
    description: `${pkg.descriptor} inside ${space.name} (${space.tagline}).`,
    price: Math.round((space.hourlyRate * pkg.durationMinutes) / 60),
    category: space.category,
    durationMinutes: pkg.durationMinutes,
  })),
);
