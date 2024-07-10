export default defineEventHandler(async (event) => {
  const method = event.method.toLowerCase(); // Get the HTTP method (GET, POST, etc.)

  if (method === "post") {
    // Invalidate the token or handle logout logic here if necessary
    // For a stateless JWT approach, you might simply return a success message

    return { message: "Logged out successfully" };
  } else {
    // Handle other HTTP methods (GET, PUT, DELETE, etc.)
    event.res.statusCode = 405; // Method Not Allowed
    return { error: `Method not allowed ${method}` };
  }
});
