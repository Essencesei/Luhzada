import { getCart } from "@/libs/db/cart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your Cart",
};

const CartPage = async () => {
  const cart = await getCart();
  return <div className="text-3xl font-bold">Shopping Cart</div>;
};

export default CartPage;
