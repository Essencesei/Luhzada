import FormSubmitBtn from "@/components/formSubmitBtn";
import prisma from "@/libs/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

const addProduct = async (formdata: FormData) => {
  "use server";

  const title = formdata.get("title")?.toString();
  const description = formdata.get("description")?.toString();
  const imgUrl = formdata.get("imgUrl")?.toString();
  const price = Number(formdata.get("price") || 0);

  if (!title || !description || !imgUrl || !price)
    throw Error("Required Fields Error");

  await prisma.product.create({
    data: {
        title, description, imgUrl, price
    }
  });

  redirect("/");
};

const AddProductPage = () => {
  return (
    <div className="m-4">
      <h2 className="font-bold text-xl my-4">Add Product</h2>
      <form action={addProduct} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          id="title"
          className="input input-primary"
          required
          placeholder="Product Name"
        />
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          className="textarea textarea-primary"
          required
          placeholder="Product Description"
        ></textarea>
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          className="input input-primary"
          required
          placeholder="Image URL"
        />
        <input
          type="number"
          name="price"
          id="price"
          className="input input-primary"
          required
          placeholder="Price"
        />
        <FormSubmitBtn className="btn-block">
          Add Product
        </FormSubmitBtn>
      </form>
    </div>
  );
};

export default AddProductPage;
