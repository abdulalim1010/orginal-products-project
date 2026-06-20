"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FootballBootPage() {
  const [boots, setBoots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/footballs")
      .then((res) => res.json())
      .then((data) => {
        setBoots(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">
          Loading Football Boots...
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">
        Football Boots Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boots.map((boot) => (
          <div
            key={boot._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative h-64">
              <Image
                src={boot.image}
                alt={boot.name}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {boot.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {boot.brand}
              </p>

              <p className="text-blue-600 font-bold text-xl mt-3">
                ৳ {boot.price}
              </p>

              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}