import Product from "~/server/models/productModel";

export default defineEventHandler(async (event) => {
  // Extract the id parameter from the event context
  const id = getRouterParam(event, "id");

  if (!id) {
    event.node.res.statusCode = 400; // Bad Request
    return { error: "ID parameter is required" };
  }

  try {
    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      event.node.res.statusCode = 404; // Not Found
      return { error: "Product not found" };
    }

    event.node.res.statusCode = 200; // OK
    return { message: "Product successfully deleted" };
  } catch (error) {
    event.node.res.statusCode = 500; // Internal Server Error
    return { error: "An error occurred while deleting the product" };
  }
});
