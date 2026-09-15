import Image from "next/image";

const facilities = [
  {
    title: "Nature-Inspired Pool",
    description: "Serene Swimming Pool with a Touch of Paradise",
    image: "/poolside_tropical.jpg",
  },
  {
    title: "Integrated Tourist Area",
    description: "Tourism integration is enhancing travel experiences",
    image: "/resort.jpg",
  },
  {
    title: "Window Sunset",
    description: "From the Room, Witness the Beauty of the World",
    image: "/poolside.jpg",
  },
];

export default function ExclusiveFacilities() {
  return (
    <section className="px-6 py-16 sm:px-8 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:justify-between lg:gap-12 lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-neutral-500">
              Premium Facilities
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-600 sm:text-5xl lg:text-6xl">
              Exclusive Premium
              <br />
              Facilities
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-neutral-500 md:text-lg font-sans">
            Our exclusive amenities include a luxurious swimming pool and
            breathtaking integrated views. Every corner is meticulously designed
            to create an exceptional ambiance
          </p>
        </div>

        {/* Grid Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {facilities.map((facility) => (
            <div key={facility.title} className="group flex flex-col gap-5">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-neutral-600 sm:text-3xl">
                  {facility.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 sm:text-base pr-4 font-sans">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
