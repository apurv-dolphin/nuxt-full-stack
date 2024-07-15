<template>
  <div class="min-h-[500px] mb-6">
    <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
      <button
        @click="openCreateModal"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4 right-2 absolute"
      >
        Create Product
      </button>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Our Products
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            List of our products of Apurv Khalas.
          </p>
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Product Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Qty</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="product in products"
            :key="product._id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ product.name }}
            </th>
            <td class="px-6 py-4">{{ product.category }}</td>
            <td class="px-6 py-4">{{ product.price }}</td>
            <td class="px-6 py-4">{{ product.stockQuantity }}</td>
            <td class="px-6 py-4">{{ product.description }}</td>
            <td class="px-6 py-4 flex justify-end space-x-4">
              <div
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                @click="handleEdit(product)"
              >
                Edit
              </div>
              <div
                class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                @click="handleDelete(product._id)"
              >
                Delete
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <editModal
    v-if="modaleInfo.editProduct"
    :product="modaleInfo.editProductData"
    :mode="modalMode"
    @close-modal="cancelEdit"
  />
  <deleteModal
    v-if="modaleInfo.deleteProduct"
    :id="modaleInfo.deleteId"
    @close-modal="cancelDelete"
  />
  <editModal
    v-if="modaleInfo.editProduct"
    :product="modaleInfo.editProductData"
    :mode="modalMode"
    @close-modal="cancelEdit"
  />
  <deleteModal
    v-if="modaleInfo.deleteProduct"
    :id="modaleInfo.deleteId"
    @close-modal="cancelDelete"
  />
</template>

<script>
import { ref } from "vue";
import DeleteModal from "~/components/Modal/deleteModal.vue";
import EditModal from "~/components/Modal/editModal.vue";
import axiosClient from "~/service/runtimeConfig";
import { useProductStore } from "~/store/productStore";
export default {
  name: "Product",
  components: {
    EditModal,
    DeleteModal,
  },
  setup() {
    const productStore = useProductStore();

    const modaleInfo = ref({
      editProduct: false,
      deleteProduct: false,
      deleteId: null,
      editProductData: {},
    });
    const modalMode = ref("");

    const openCreateModal = () => {
      modaleInfo.value.editProductData = {};
      modaleInfo.value.editProduct = true;
      modalMode.value = "add";
    };

    const handleDelete = async (id) => {
      modaleInfo.value.deleteId = id;
      modaleInfo.value.deleteProduct = true;
    };

    const handleEdit = async (product) => {
      modaleInfo.value.editProductData = product;
      modaleInfo.value.editProduct = true;
    };

    const cancelDelete = () => {
      modaleInfo.value.deleteProduct = false;
    };

    const cancelEdit = () => {
      modaleInfo.value.editProductData = {};
      modaleInfo.value.editProduct = false;
    };

    const getProducts = async () => {
      try {
        const response = await axiosClient.get("/products");
        productData.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(async () => {
      await productStore.getProducts();
    });

    const products = computed(() => productStore.products);
    return {
      products,
      modaleInfo,
      modalMode,
      openCreateModal,
      handleEdit,
      handleDelete,
      cancelDelete,
      cancelEdit,
    };
  },
};
</script>
