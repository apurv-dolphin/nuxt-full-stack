import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { token } = body;

  try {
    const decoded = jwt.verify(token, config.token);
    return { valid: true, decoded };
  } catch (error: any) {
    event.res.statusCode = 401; // Unauthorized
    return { valid: false, error: error.message };
  }
});
