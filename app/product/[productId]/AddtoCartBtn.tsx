"use client";
import React, { useState, useTransition } from "react";
import { incrementProductQuantity } from "./actions";

type AddtoCartBtnProps = {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
};

const AddtoCartBtn = ({
  productId,
  incrementProductQuantity,
}: AddtoCartBtnProps) => {
  const [ispending, startTranstion] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTranstion(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
      </button>
      {ispending && <span className="loading loading-spinner"></span>}
      {success && !ispending && <span className="text-success">Added to Cart</span>}
    </div>
  );
};

export default AddtoCartBtn;
