"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/mainproducts" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Original<span className="text-blue-600">Products</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative font-medium transition-colors ${
                    active
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}

                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Shop Now
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${
                      pathname === link.path
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <button className="mt-2 w-full py-2 rounded-lg bg-blue-600 text-white">
                  Shop Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}