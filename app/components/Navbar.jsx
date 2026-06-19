"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [authState, setAuthState] = useState({ user: null, isLoggedIn: false });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp * 1000 > Date.now()) {
            setAuthState({ user: payload, isLoggedIn: true });
          }
        } catch (error) {
          // Invalid token
        }
      }
    };

    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthState({ user: null, isLoggedIn: false });
    window.location.reload();
  };

  const categories = [
    { name: "Jersey", path: "/categories/jersey" },
    { name: "Pant", path: "/categories/pant" },
    { name: "Football Boot", path: "/categories/football-boot" },
    { name: "Sports Shoe", path: "/categories/sports-shoe" },
    { name: "Football", path: "/categories/football" },
    { name: "Cricket Bat", path: "/categories/circuit-bat" },
    { name: "Other Sports Items", path: "/categories/others" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/mainproducts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
            {navLinks.slice(0, 2).map((link) => {
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
                      layoutId="navbar-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition">
                Categories
                <span className="text-xs">▼</span>
              </button>

              <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-3 bg-gray-50 border-b">
                    <h3 className="font-semibold text-gray-800">
                      Sports Categories
                    </h3>
                  </div>

                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="flex items-center px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => {
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
                      layoutId="navbar-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side - Auth */}
          <div className="hidden md:flex items-center gap-4">
            {authState.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  Hello, {authState.user?.name || authState.user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
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
              className="md:hidden overflow-hidden border-t"
            >
              <div className="py-4 flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700"
                >
                  Home
                </Link>

                <Link
                  href="/mainproducts"
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700"
                >
                  Products
                </Link>

                {/* Mobile Categories */}
                <div>
                  <button
                    onClick={() =>
                      setMobileCategoryOpen(!mobileCategoryOpen)
                    }
                    className="flex items-center justify-between w-full font-medium text-gray-700"
                  >
                    Categories
                    <span>
                      {mobileCategoryOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {mobileCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-3 flex flex-col gap-3">
                          {categories.map((category) => (
                            <Link
                              key={category.path}
                              href={category.path}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileCategoryOpen(false);
                              }}
                              className="text-gray-600 hover:text-blue-600"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700"
                >
                  Contact
                </Link>

                {/* Mobile Auth */}
                {authState.isLoggedIn ? (
                  <div className="flex flex-col gap-3 pt-2">
                    <span className="text-gray-700 font-medium">
                      Hello, {authState.user?.name || authState.user?.email}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="py-2 rounded-xl bg-gray-200 text-gray-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="py-2 rounded-xl bg-blue-600 text-white font-medium text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="py-2 rounded-xl border border-blue-600 text-blue-600 font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                <button className="mt-2 w-full py-3 rounded-xl bg-blue-600 text-white font-medium">
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