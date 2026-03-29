import type { Service } from "@/src/lib/types";

export const seedServices: Service[] = [
  {
    id: "prod_studio_4h",
    name: "Studio Session - 4 Hours",
    description: "Full access to lighting rig and backdrop.",
    price: 8000,
    category: "Studio",
    durationMinutes: 240,
  },
  {
    id: "prod_portrait_2h",
    name: "Portrait Photography - 2 Hours",
    description: "Directed portrait session with post-processing.",
    price: 6500,
    category: "Photography",
    durationMinutes: 120,
  },
  {
    id: "prod_edit_3h",
    name: "Video Edit Suite - 3 Hours",
    description: "Color and edit suite booking with operator support.",
    price: 9000,
    category: "Video",
    durationMinutes: 180,
  },
];
