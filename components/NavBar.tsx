import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { getCart } from "@/libs/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";

const searchProducts = async (formdata: FormData) => {
  "use server";
  const searchQuery = formdata.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
};

const NavBar = async () => {
    const cart  = await getCart()

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
            Luhzada
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart}/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
