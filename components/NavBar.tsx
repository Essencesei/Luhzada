import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { getCart } from "@/libs/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";



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
         
          <ShoppingCartButton cart={cart}/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
