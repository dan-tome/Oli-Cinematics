import Image from "next/image";

const galleryImages = [
  { src: "/images/studio-a.jpg", alt: "Studio lighting setup" },
  { src: "/images/studio-b.svg", alt: "Camera rig preparation" },
  { src: "/images/studio-c.svg", alt: "Color graded cinematic frame" },
  { src: "/images/studio-d.svg", alt: "Portrait backdrop and softboxes" },
  { src: "/images/studio-e.svg", alt: "Editing suite timeline view" },
  { src: "/images/studio-f.svg", alt: "Team prep before production day" },
];

export function GalleryGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {galleryImages.map((image) => (
        <div key={image.src} className="overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="h-[260px] w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
