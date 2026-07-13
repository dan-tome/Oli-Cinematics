import type { Space } from "@/src/lib/types";

// The real studio: one large industrial unit in Wembley, London, set up as a
// seamless white infinity cove plus four flexible spaces. Each flex space has
// three large rotating panel sets so its look can change between bookings, and
// every space books independently so multiple productions can run at once.
//
// PLACEHOLDER SPECS — hourlyRate, sizeSqft, capacity and amenities are working
// estimates. Confirm with Oliver before launch.
export const seedSpaces: Space[] = [
  {
    id: "space_cove",
    slug: "infinity-cove",
    name: "The Infinity Cove",
    tagline: "Seamless White Cove",
    description:
      "The heart of the building: a seamless white infinity cove inside our Wembley industrial unit, with a levelled floor for set builds and room to light from every angle. Kept studio white — ask for a fresh repaint when you book.",
    hourlyRate: 15000,
    capacity: "Up to 20 crew",
    sizeSqft: 1400,
    features: [
      "Seamless white infinity cove",
      "Fresh white repaint on request",
      "Levelled floor for set builds",
      "Full blackout capability",
      "Lighting rig over the cove",
    ],
    amenities: ["Client seating area", "Tea & coffee", "WiFi"],
    useCases: ["Music videos", "Fashion & editorial", "Commercials", "E-commerce", "Dance & movement"],
    image: "/images/infinity-cove.jpg",
    category: "Studio",
  },
  {
    id: "space_one",
    slug: "space-one",
    name: "Space One",
    tagline: "Podcast & Interview",
    description:
      "A flexible space built around three large rotating panel sets, dressed for conversation. Spin a panel between bookings and the whole room changes — record two very different shows in the same week without a rebuild.",
    hourlyRate: 8500,
    capacity: "Up to 8 crew",
    sizeSqft: 650,
    features: [
      "Three rotating panel sets — three looks in one room",
      "Set changes between bookings, not during your clock",
      "Multi-camera friendly sightlines",
      "Books independently of the other spaces",
    ],
    amenities: ["Client seating area", "Tea & coffee", "WiFi"],
    useCases: ["Podcasts", "Interviews", "Live sessions", "YouTube"],
    image: "/images/space-one.jpg",
    category: "Audio",
  },
  {
    id: "space_two",
    slug: "space-two",
    name: "Space Two",
    tagline: "Portrait & Fashion",
    description:
      "Three rotating panel sets styled as portrait and fashion backdrops. Move from clean editorial to textured lifestyle looks in minutes, with room for wardrobe and styling alongside the set.",
    hourlyRate: 8500,
    capacity: "Up to 8 crew",
    sizeSqft: 650,
    features: [
      "Three rotating panel sets — three looks in one room",
      "Backdrop looks from clean to textured",
      "Space for wardrobe & styling",
      "Books independently of the other spaces",
    ],
    amenities: ["Wardrobe rail", "Tea & coffee", "WiFi"],
    useCases: ["Portraits", "Look-books", "Headshots", "Editorial"],
    image: "/images/studio-b.svg",
    category: "Photography",
  },
  {
    id: "space_three",
    slug: "space-three",
    name: "Space Three",
    tagline: "Product & Tabletop",
    description:
      "A controlled space for product, e-commerce and tabletop work, with three rotating panel sets to switch the backdrop behind your build. Ideal for brands shooting a catalogue and content in one visit.",
    hourlyRate: 8500,
    capacity: "Up to 8 crew",
    sizeSqft: 650,
    features: [
      "Three rotating panel sets — three looks in one room",
      "Tabletop & stand-friendly layout",
      "Consistent controlled lighting conditions",
      "Books independently of the other spaces",
    ],
    amenities: ["Prep table", "Tea & coffee", "WiFi"],
    useCases: ["Product", "E-commerce", "Flat lays", "Stop motion"],
    image: "/images/studio-c.svg",
    category: "Photography",
  },
  {
    id: "space_four",
    slug: "space-four",
    name: "Space Four",
    tagline: "Creator Flex Space",
    description:
      "The wildcard: three rotating panel sets and an open floor that adapts to whatever the brief needs — social content days, workshops, showreels and behind-the-scenes builds.",
    hourlyRate: 8500,
    capacity: "Up to 8 crew",
    sizeSqft: 650,
    features: [
      "Three rotating panel sets — three looks in one room",
      "Open reconfigurable floor",
      "Fast turnaround between setups",
      "Books independently of the other spaces",
    ],
    amenities: ["Client seating area", "Tea & coffee", "WiFi"],
    useCases: ["Social content", "Creator shoots", "Workshops", "Showreels"],
    image: "/images/studio-a.svg",
    category: "Video",
  },
];
