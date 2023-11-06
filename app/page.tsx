import prisma from "@/libs/db/prisma";
import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/productCard";
import Link from "next/link";

const getProduct = async () => {
  "use server";
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products;
};

const HomePage = async () => {
  const products = await getProduct();
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imgUrl}
            alt={products[0].title}
            width={1000}
            height={1000}
            className="rounded-md object-cover"
            priority
          ></Image>
          <div>
            <h1 className="text-5xl font-bold">{products[0].title}</h1>
            <p className="py-6 text-justify">{products[0].description}</p>

            <Link
              href={`/product/${products[0].id}`}
              className="btn btn-primary"
            >
              Find Out
            </Link>
          </div>
        </div>
      </div>

      {/* grid */}

      <div className="m-4 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(1).map((product: Product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="my-4 hover:shadow-lg"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
