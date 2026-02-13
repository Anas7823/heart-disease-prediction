// Je cree la barre de navigation glassmorphism
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { Menu, X, Activity } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Le Problème" },
  { href: "/data", label: "Les Données" },
  { href: "/training", label: "L'Entrainement" },
  { href: "/demo", label: "Diagnostic IA" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl mt-4 px-4">
        <div className="glass px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-bold gradient-text"
          >
            <Activity size={18} />
            CardioAI
          </Link>

          {/* Navigation desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm transition-all duration-300",
                    pathname === item.href
                      ? "bg-white/10 text-text-primary font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation mobile */}
        {mobileOpen && (
          <div className="glass mt-2 p-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "block px-4 py-3 rounded-lg text-sm transition-all duration-300",
                      pathname === item.href
                        ? "bg-white/10 text-text-primary font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
