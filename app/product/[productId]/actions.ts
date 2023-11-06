"use server"; 
import { createcart, getCart } from "@/libs/db/cart";
import prisma from "@/libs/db/prisma";
import { revalidatePath } from "next/cache";

export const incrementProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createcart());

  // checking if productId is already in the cart

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
    });
  }

  revalidatePath("/product/[productId]");
};
