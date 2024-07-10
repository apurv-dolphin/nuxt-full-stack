import mongoose from "mongoose";

export default async () => {
  const config = useRuntimeConfig();
  const mongoURI = config.dburl;
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};
