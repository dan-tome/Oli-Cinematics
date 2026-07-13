import type { Space } from "@/src/lib/types";

export const seedSpaces: Space[] = [
  {
    id: "space_studio_a",
    slug: "studio-a",
    name: "Studio A",
    tagline: "The Cinematic Soundstage",
    description:
      "Our flagship 2,400 sqft drive-in stage built for cinematic productions. Cyclorama wall, motion-tracked lighting rig, and blackout capability for controlled dusk-to-dawn shoots.",
    hourlyRate: 18000,
    capacity: "Up to 30 crew",
    sizeSqft: 2400,
    features: [
      "42ft infinity cyclorama",
      "Motion-controlled Aputure grid",
      "Drive-in roller door",
      "5.1 monitoring & playback",
    ],
    amenities: ["Green room", "Client lounge", "Wardrobe & HMU bay"],
    image: "/images/studio-a.jpg",
    category: "Video",
  },
  {
    id: "space_studio_b",
    slug: "studio-b",
    name: "Studio B",
    tagline: "Portrait & Fashion",
    description:
      "An intimate 900 sqft daylight studio with a north-facing skylight and a full set of shaping tools. Ideal for editorial portraits, look-books and brand product stories.",
    hourlyRate: 9500,
    capacity: "Up to 10 crew",
    sizeSqft: 900,
    features: [
      "Natural north light + full blackout",
      "Profoto Pro-11 & modifiers",
      "Rolling paper backdrop bank",
      "Tethered capture station",
    ],
    amenities: ["Steamer & wardrobe rail", "Client viewing lounge", "Espresso bar"],
    image: "/images/studio-b.svg",
    category: "Photography",
  },
  {
    id: "space_studio_c",
    slug: "studio-c",
    name: "Studio C",
    tagline: "Colour & Edit Suite",
    description:
      "A calibrated finishing room built for narrative colour, sound mix and client review. Dolby-accurate monitoring with an operator who knows your project inside out.",
    hourlyRate: 12000,
    capacity: "Up to 4 clients",
    sizeSqft: 380,
    features: [
      "DaVinci Resolve mini panel",
      "Reference-grade LG OLED",
      "5.1 Genelec monitoring",
      "Fibre pipeline & shared storage",
    ],
    amenities: ["Private client sofa", "Focus lighting", "In-room coffee"],
    image: "/images/studio-c.svg",
    category: "Video",
  },
  {
    id: "space_studio_d",
    slug: "studio-d",
    name: "Studio D",
    tagline: "Podcast & Voice Booth",
    description:
      "A treated broadcast room engineered for spoken word, ADR and narration. Two-camera set-up with clean broadcast switching for live-to-tape releases.",
    hourlyRate: 6500,
    capacity: "Up to 4 hosts",
    sizeSqft: 240,
    features: [
      "Shure SM7B & Neumann TLM-103",
      "RØDECaster Pro II",
      "Two-camera 4K switcher",
      "Broadcast stream out",
    ],
    amenities: ["Warm lounge lighting", "Bottled water & snacks", "Private WiFi"],
    image: "/images/studio-d.svg",
    category: "Audio",
  },
];
