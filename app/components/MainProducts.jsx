"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MainProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mainproducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="relative h-60">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {product.category}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-xl text-green-600">
                  ৳{product.price}
                </span>

                <button className="px-4 py-2 bg-black text-white rounded-lg">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}