import CurrencyFormatter from "@/libs/db/currencyFormatter";
import prisma from "@/libs/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

import React, { cache } from "react";
import AddtoCartBtn from "./AddtoCartBtn";
import { incrementProductQuantity } from "./actions";

const getData = cache(async (id: string) => {
  "use server";
  const product = await prisma.product.findUnique({ where: { id: id } });
  return product;
});

export const generateMetadata = async ({ params }: any) => {
  "use server";
  const { productId } = params;
  const product = await getData(productId);

  console.log(product?.title);
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      images: [product?.imgUrl],
    },
  };
};

const ProductPage = async ({ params }: any) => {
  const { productId } = params;
  const product = await getData(productId);

  if (!product) notFound();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={product.imgUrl}
          alt={product.title}
          width={1000}
          height={1000}
          className="rounded-md object-cover "
          priority
        ></Image>
        <div>
          <h1 className="text-5xl font-bold">{product.title}</h1>
          <div className="badge badge-primary">
            {CurrencyFormatter(product.price)}
          </div>
          <p className="py-6 text-justify">{product.description}</p>
          <AddtoCartBtn
            incrementProductQuantity={incrementProductQuantity}
            productId={product.id}
          ></AddtoCartBtn>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
