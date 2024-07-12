// server/api/products.js
import Product from "../models/productModel";

export default defineEventHandler(async (event) => {
  const method = event.method.toLowerCase();
  try {
    if (method === "post") {
      // Handle POST request to create a new product
      const body = await readBody(event);
      const product = new Product(body);
      await product.save();

      event.res.statusCode = 201; // Created
      return product;
    } else if (method === "get") {
      // Handle GET request to retrieve all products
      const products = await Product.find();
      return products;
    } else if (method === "put") {
      // Handle PUT request to update a product
      const body = await readBody(event);
      const { id, ...updateData } = body;
      const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        event.res.statusCode = 404; // Not Found
        return { error: "Product not found" };
      }
      event.res.statusCode = 200;
      return {
        message: "Product successfully updated",
        product,
      };
    } else if (method === "delete") {
      // Handle DELETE request to remove a product
      console.log("Delete request received:", event);

      const params = event.context.params as { id: string };
      console.log("Params received:", params);

      if (!params || !params.id) {
        event.res.statusCode = 400; // Bad Request
        return { error: "ID parameter is required" };
      }

      const id = params.id;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        event.res.statusCode = 404; // Not Found
        return { error: "Product not found" };
      }
      event.res.statusCode = 200; // OK
      return { message: "Product successfully deleted" };
    } else {
      // Handle other HTTP methods
      event.res.statusCode = 405; // Method Not Allowed
      return { error: `Method not allowed ${method}` };
    }
  } catch (error: any) {
    console.error("Error handling request:", error);
    event.res.statusCode = 400; // Bad Request
    return { error: error.message };
  }
});
