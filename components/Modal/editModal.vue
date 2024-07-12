<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === "add" ? "Create Product" : "Edit Product" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="editableProduct.name"
            type="text"
            id="name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Category</label
          >
          <input
            v-model="editableProduct.category"
            type="text"
            id="category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Price</label
          >
          <input
            v-model="editableProduct.price"
            type="number"
            id="price"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            step="0.01"
          />
        </div>
        <div class="mb-4">
          <label
            for="stockQuantity"
            class="block text-sm font-medium text-gray-700"
            >Stock Quantity</label
          >
          <input
            v-model="editableProduct.stockQuantity"
            type="number"
            id="stockQuantity"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>
        <div class="mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            v-model="editableProduct.description"
            id="description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('close-modal')"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ mode === "add" ? "Create" : "Update" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosClient from "~/service/runtimeConfig";
import { useProductStore } from "~/store/productStore";

export default {
  name: "editModal",
  emits: ["close-modal"],
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const productStore = useProductStore();
    const snackbar = useSnackbar();
    const editableProduct = reactive({ ...props.product });

    const handleSubmit = async () => {
      try {
        if (props.mode === "add") {
          await createProduct();
        } else {
          await updateProduct();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const createProduct = async () => {
      try {
        const payload = {
          name: editableProduct.name,
          description: editableProduct.description,
          price: editableProduct.price,
          category: editableProduct.category,
          stockQuantity: editableProduct.stockQuantity,
        };
        const response = await axiosClient.post("/products", payload);
        if (response.data) {
          snackbar.add({
            type: "success",
            text: "Product successfully created",
          });
          await productStore.getProducts();
          emit("close-modal");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const updateProduct = async () => {
      try {
        const payload = {
          id: editableProduct._id,
          name: editableProduct.name,
          description: editableProduct.description,
          price: editableProduct.price,
          category: editableProduct.category,
          stockQuantity: editableProduct.stockQuantity,
        };
        const response = await axiosClient.put("/products", payload);
        if (response.data) {
          snackbar.add({
            type: "success",
            text: response.data.message,
          });
          await productStore.getProducts();
          emit("close-modal");
        }
      } catch (error) {
        console.log(error);
      }
    };
    watch(
      () => props.product,
      (newProduct) => {
        Object.assign(editableProduct, newProduct);
      }
    );
    return {
      editableProduct,
      handleSubmit,
    };
  },
};
</script>
