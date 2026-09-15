import Image from "next/image";

export default function HotelAbout() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full font-serif text-neutral-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center max-w-5xl mx-auto">
        {/* Text Content */}
        <div className="max-w-md md:pr-8">
          <h2 className="font-serif text-4xl md:text-[2.75rem] font-medium text-neutral-600 mb-6 leading-[1.1] tracking-tight">
            Where the ocean
            <br />
            feels close
          </h2>
          <p className="text-[15px] text-neutral-500 leading-relaxed mb-10 font-sans">
            Surrounded by coastal shores, Belmont invites you to slow down and
            reconnect with the natural rhythm of the sea. Mornings arrive softly
            with drifting light, and evenings settle into calm, uninterrupted
            stillness.
          </p>
          <button className="bg-terra-400 hover:bg-terra-500 text-neutral-100 px-8 py-3.5 rounded-full uppercase tracking-wider text-xs font-bold transition-colors duration-300 font-sans">
            Discover Nature
          </button>
        </div>

        {/* Images */}
        <div className="relative pl-0 md:pl-12 mt-12 md:mt-0">
          <div className="relative h-[450px] md:h-[550px] w-full md:w-[90%] rounded-[2rem] overflow-hidden bg-slate-200">
            <Image
              src="/poolside_tropical.jpg"
              alt="Belmont Resort Nature"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 h-[200px] w-[200px] md:h-[280px] md:w-[280px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-neutral-100 bg-neutral-200">
            <Image
              src="/view.jpg"
              alt="Ocean View"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
