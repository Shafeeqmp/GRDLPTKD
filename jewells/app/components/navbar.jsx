"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/Collections" },
    { name: "About", link: "/About" },
    { name: "Services", link: "/Services" },
    { name: "Contact", link: "/Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">

          {/* LOGO - Bigger */}
          <div className="flex items-center">
            <div className="relative w-48 h-24 md:w-56 md:h-24">
              <Image
                src="/images/newlogo.png"
                alt="Gemerald Gold & Diamonds"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Luxury divider - hidden on mobile */}
            <div className="hidden lg:block w-px h-10 ml-4 bg-linear-to-b from-transparent via-amber-400 to-transparent"></div>
          </div>

          {/* DESKTOP NAV - Right aligned */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-gray-800 hover:text-amber-600 font-medium text-sm uppercase tracking-wider transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-amber-500 transform -translate-x-1/2 group-hover:w-4/5 transition-all duration-300"></span>
              </Link>

            ))}

            {/* Luxury divider */}
            <div className="w-px h-8 bg-linear-to-b from-transparent via-amber-400 to-transparent"></div>

            <div className="flex items-center gap-4">
              {/* Rate Page Button */}
              <Link
                href="/today-rates"
                className="px-5 py-2.5 border-2 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm uppercase text-sm tracking-wide"
              >
                Today's Rates
              </Link>

              {/* CTA with sparkle */}
              <button className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/30 group">
                <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                Enquire Now
              </button>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-amber-100 shadow-xl">
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="flex items-center px-4 py-4 text-gray-800 hover:text-amber-600 hover:bg-amber-50 rounded-lg font-medium transition-colors border-b border-amber-50 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 px-2 space-y-3">
                <Link
                  href="/today-rates"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors uppercase text-sm tracking-wide"
                >
                  Today's Rates
                </Link>

                <button className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}