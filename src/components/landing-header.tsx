"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";

export default function LandingHeader() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-6 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
        <Link href="/" className="flex items-center gap-2 text-white">
          
          <span className="font-semibold mix-blend-difference">Studydio</span>
        </Link>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#why-choose-us" className="hover:text-white transition-colors">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

    