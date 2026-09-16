"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Utensils, Shirt, Car } from "lucide-react";
import { SlideUp } from "@/components/ui/animations";

const rooms = [
  {
    id: "01",
    name: "Premium cottage",
    eyebrow: "Cozy & intimate",
    title: "Premium cottage",
    description:
      "Experience the ultimate comfort in our secluded cottage with beautiful garden views and rustic charm.",
    price: "$35.00",
    image: "/room1.jpg",
  },
  {
    id: "02",
    name: "Studios with terrace",
    eyebrow: "Outdoor living",
    title: "Studios with terrace",
    description:
      "Enjoy a spacious open-plan layout featuring a private terrace perfect for evening relaxation.",
    price: "$40.00",
    image: "/room.jpg",
  },
  {
    id: "03",
    name: "Premium pavilions",
    eyebrow: "Phenomenal view",
    title: "Premium pavilions",
    description:
      "Discover a private home in the orchard three bedrooms and baths with a private plunge pool and service and a three sided view from the king size bed.",
    price: "$50.00",
    image: "/room2.jpg",
  },
  {
    id: "04",
    name: "The luxury villa",
    eyebrow: "Ultimate elegance",
    title: "The luxury villa",
    description:
      "A breathtaking villa designed for grandeur, featuring exquisite interiors and sweeping panoramic views.",
    price: "$95.00",
    image: "/room3.jpg",
  },
  {
    id: "05",
    name: "Grand deluxe room",
    eyebrow: "Spacious luxury",
    title: "Grand deluxe room",
    description:
      "Our largest room option boasting premium amenities, sophisticated decor, and unparalleled service.",
    price: "$75.00",
    image: "/room4.jpg",
  },
];

export function DiscoverDestinations() {
  const [activeTab, setActiveTab] = useState(2); // Default to "03 Premium pavilions"

  const activeRoom = rooms[activeTab];

  return (
    <section className="w-full">
      <SlideUp className="flex min-h-[600px] w-full flex-col lg:flex-row">
        {/* Left Tabs */}
        <div className="flex w-full flex-col bg-background py-4 lg:w-[25%] lg:py-8 lg:pl-8 xl:pl-16 lg:pr-2">
          {rooms.map((room, index) => {
            const isActive = index === activeTab;
            return (
              <button
                key={room.id}
                onClick={() => setActiveTab(index)}
                className={`relative flex w-full items-center justify-between px-6 py-7 lg:px-8 text-left transition-colors lg:rounded-r-full ${
                  isActive
                    ? "z-10 bg-terra-400 text-white shadow-lg lg:-mr-6"
                    : "text-neutral-700 hover:bg-neutral-200/50"
                }`}
              >
                <span className="flex items-start font-serif text-lg md:text-xl">
                  <span
                    className={`mr-3 mt-1 shrink-0 text-sm ${isActive ? "text-white/80" : "text-terra-400"}`}
                  >
                    {room.id}
                  </span>
                  <span>{room.name}</span>
                </span>
                {isActive && <ArrowRight className="h-5 w-5 shrink-0 ml-4" />}
              </button>
            );
          })}
        </div>

        {/* Center Image */}
        <div className="relative h-[400px] w-full lg:h-auto lg:w-[45%]">
          <Image
            src={activeRoom.image}
            alt={activeRoom.title}
            fill
            className="object-cover"
          />
          {/* Price Widget */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 shadow-xl lg:left-1/2 lg:-translate-x-1/2">
            <div className="flex min-w-[140px] flex-col justify-center bg-white px-6 py-4 lg:min-w-[180px] lg:px-8 lg:py-5">
              <p className="mb-1 font-sans text-xs uppercase tracking-wider text-neutral-400">
                Starting from
              </p>
              <p className="font-serif text-2xl font-medium text-neutral-900 lg:text-3xl">
                {activeRoom.price}
              </p>
            </div>
            <button className="group flex items-center justify-center gap-4 bg-[#2D2D2D] px-6 py-4 text-white transition-colors hover:bg-black lg:px-8 lg:py-5">
              <span className="w-12 text-left text-xs font-bold leading-tight tracking-widest uppercase lg:text-sm">
                Book
                <br />
                Now
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Details */}
        <div className="flex w-full flex-col justify-center bg-background px-6 py-12 lg:w-[30%] lg:px-12 xl:pr-16">
          <p className="mb-2 font-sans text-sm text-terra-400">
            {activeRoom.eyebrow}
          </p>
          <h3 className="mb-6 font-serif text-4xl font-medium text-neutral-800 lg:text-[2.75rem] leading-[1.1]">
            {activeRoom.title}
          </h3>
          <p className="mb-12 font-sans leading-relaxed text-neutral-500">
            {activeRoom.description}
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-neutral-200/60 pt-8 lg:gap-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <Utensils className="h-8 w-8 text-terra-400" strokeWidth={1} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-700 lg:text-[10px]">
                Breakfast
                <br />
                Included
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 border-l border-neutral-200/60 text-center">
              <Shirt className="h-8 w-8 text-terra-400" strokeWidth={1} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-700 lg:text-[10px]">
                Laundry
                <br />
                Facilities
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 border-l border-neutral-200/60 text-center">
              <Car className="h-8 w-8 text-terra-400" strokeWidth={1} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-700 lg:text-[10px]">
                Pickup
                <br />
                And Drop
              </span>
            </div>
          </div>
        </div>
      </SlideUp>
    </section>
  );
}
