import { StaggerContainer, SlideUp } from "@/components/ui/animations";
import Image from "next/image";
import { Room } from "@/data/rooms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RoomGalleryProps {
  room: Room;
}

export function RoomGallery({ room }: RoomGalleryProps) {
  return (
    <section className="bg-neutral-900 px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-12 md:mb-16 text-center">
          <SlideUp>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Room Gallery
            </h2>
          </SlideUp>
        </StaggerContainer>

        <SlideUp delay={0.1} className="w-full max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {room.gallery.map((imgSrc, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3">
                  <div className="p-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group">
                      <Image
                        src={imgSrc}
                        alt={`${room.name} gallery image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/10 text-white hover:bg-white hover:text-black border-none" />
            <CarouselNext className="bg-white/10 text-white hover:bg-white hover:text-black border-none" />
          </Carousel>
        </SlideUp>
      </div>
    </section>
  );
}
