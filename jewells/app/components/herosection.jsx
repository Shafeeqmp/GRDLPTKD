import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner2.jpg"
          alt="Gold Collection Background"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6 w-full overflow-hidden">
            <span className="text-amber-400 font-light tracking-widest text-sm mt-15 animate-marquee whitespace-nowrap">
              GEMERALD GOLD & DIAMONDS
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Timeless
            <span className="block text-amber-300">Elegance</span>
            <span className="block text-white/90 text-4xl md:text-5xl mt-4">
              Redefined
            </span>
          </h1>

          <p className="text-gray-200 text-xl mb-10 leading-relaxed">
            Experience the pinnacle of luxury with our curated collection of
            exceptional gold and diamond masterpieces.
          </p>

          <button className="group px-10 py-5 bg-transparent border-2 border-amber-400 text-amber-300 font-medium text-lg rounded-none hover:bg-amber-400 hover:text-black transition-all duration-300 flex items-center gap-3">
            DISCOVER
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
