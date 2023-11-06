"use client";
import { Product } from "@prisma/client";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitBtnProps = {
  className: string;
  children: React.ReactNode;
} & ComponentProps<"button">;

const FormSubmitBtn = ({ children, className }: FormSubmitBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${className} btn btn-primary`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitBtn;
