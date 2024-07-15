// server/api/login.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export default defineEventHandler(async (event) => {
  const method = event.method.toLowerCase(); // Get the HTTP method (GET, POST, etc.)
  const body = await readBody(event);
  const { email, password } = body;
  const config = useRuntimeConfig();

  try {
    if (method === "post") {
      // Handle POST request for login
      const user = await User.findOne({ email });

      if (!user) {
        event.res.statusCode = 404; // Not Found
        return { error: "User not found" };
      }

      const isMatch = user && bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        event.res.statusCode = 401; // Unauthorized
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign({ id: user._id }, config.token, {
        expiresIn: "3h",
      });

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      };
    } else {
      // Handle other HTTP methods (PUT, DELETE, etc.)
      event.res.statusCode = 405; // Method Not Allowed
      return { error: `Method not allowed ${method}` };
    }
  } catch (error: any) {
    event.res.statusCode = 400; // Bad Request
    return { error: error.message };
  }
});
