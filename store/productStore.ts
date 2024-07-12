import { defineStore } from "pinia";
import axiosClient from "~/service/runtimeConfig";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Array<any>,
  }),
  actions: {
    async getProducts() {
      try {
        const response = await axiosClient.get("/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
});
