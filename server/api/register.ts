// server/api/register.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export default defineEventHandler(async (event) => {
  const method = event.method.toLowerCase();
  const body = await readBody(event);
  const { firstName, lastName, email, password } = body;
  const config = useRuntimeConfig();

  try {
    if (method === "post") {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ id: savedUser._id }, config.token, {
        expiresIn: "1h",
      });

      return {
        token,
        user: {
          id: savedUser._id,
          email: savedUser.email,
        },
      };
    } else {
      // Handle other HTTP methods (PUT, DELETE, etc.)
      event.res.statusCode = 405;
      return {
        body: {
          error: "Method not allowed",
        },
      };
    }
  } catch (error: any) {
    event.res.statusCode = 400;
    return {
      body: {
        error: error.message,
      },
    };
  }
});
