import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function JerseyDetails({ params }) {
  const client = await clientPromise;

  const db = client.db("orginalDB");

  const jersey = await db
    .collection("jerseys")
    .findOne({
      _id: new ObjectId(params.id),
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="relative h-[500px]">
          <Image
            src={jersey.image}
            alt={jersey.name}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {jersey.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {jersey.brand}
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-5">
            ৳ {jersey.price}
          </h2>

          <p className="mt-6 text-gray-600">
            {jersey.description}
          </p>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}