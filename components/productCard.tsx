
import CurrencyFormatter from "@/libs/db/currencyFormatter";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={product.imgUrl}
          alt={product.title}
          width={1000}
          height={1000}
          className="rounded-md object-cover h-[250px]"
          priority
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="flex gap-2">
          <div className="badge badge-primary">
            {CurrencyFormatter(product.price)}
          </div>
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </div>

        <p className="line-clamp-4">{product.description}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default ProductCard;
