"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BannerSection() {
  const banners = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(slider);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full px-3 md:px-6 lg:px-10 py-5">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={banners[current]}
              alt={`Banner ${current + 1}`}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-3xl px-5 md:px-10 text-white">
            <motion.h1
              key={`title-${current}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4"
            >
              Original Products
            </motion.h1>

            <motion.p
              key={`desc-${current}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg lg:text-xl mb-6 max-w-xl"
            >
              Discover premium quality products with trusted authenticity
              and unbeatable prices.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-5 md:px-8 py-3 rounded-full font-semibold"
            >
              Shop Now
            </motion.button>
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "bg-white w-8 h-3"
                  : "bg-white/50 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}