"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function JerseyPage() {
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    fetch("/api/jerseys")
      .then((res) => res.json())
      .then((data) => setJerseys(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">
        Jersey Collection
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jerseys.map((jersey) => (
          <div
            key={jersey._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-72">
              <Image
                src={jersey.image}
                alt={jersey.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {jersey.name}
              </h2>

              <p className="text-gray-500">
                {jersey.brand}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-xl font-bold text-blue-600">
                  ৳{jersey.price}
                </span>

<Link
                   href={`/categories/jersey/${jersey._id}`}
                   className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                 >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}