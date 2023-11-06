import { Cart, Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type CartWithProduct = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

export const getCart = async (): Promise<ShoppingCart | null> => {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * Number(item.product.price),
      0
    ),
  };
};

export const createcart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //save to local
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};