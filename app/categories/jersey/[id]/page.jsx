import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function JerseyDetails({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("orginalDB");

  const jersey = await db.collection("jerseys").findOne({
    _id: new ObjectId(id),
  });

  if (!jersey) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Jersey Not Found</h1>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={jersey.image}
            alt={jersey.name}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {jersey.name}
          </h1>

          <p className="text-lg text-gray-500 mb-4">
            Brand: {jersey.brand}
          </p>

          <p className="text-3xl font-bold text-blue-600 mb-6">
            ৳ {jersey.price}
          </p>

          <p className="text-gray-700 leading-8">
            {jersey.description}
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
              Add To Cart
            </button>

            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}