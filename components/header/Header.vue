<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Apurv</span
        >
      </div>
      <button
        @click="toggleNav"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        :class="{ block: isNavOpen, hidden: !isNavOpen }"
        class="w-full md:block md:w-auto"
        id="navbar-default"
      >
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li class="flex flex-wrap content-center">
            <nuxt-link
              :to="'/'"
              :class="isActive('/')"
              class="w-full block py-2 px-3 rounded md:bg-transparent md:p-0 dark:text-white"
              >Home
            </nuxt-link>
          </li>
          <li class="flex flex-wrap content-center">
            <nuxt-link
              :to="'/product'"
              :class="isActive('/product')"
              class="w-full block py-2 px-3 rounded md:bg-transparent md:p-0 dark:text-white"
              >Product
            </nuxt-link>
          </li>
          <li class="flex flex-wrap content-center">
            <nuxt-link
              :to="'/apurv'"
              :class="isActive('/apurv')"
              class="w-full block py-2 px-3 rounded md:bg-transparent md:p-0 dark:text-white"
              >Apurv
            </nuxt-link>
          </li>
          <li class="flex flex-wrap content-center">
            <button
              class="bg-[#00da9f] hover:bg-[#00da9f] block py-2 px-4 text-white rounded-full"
              @click="handleLogout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "~/service/runtimeConfig";
import { useAuthStore } from "~/store/authentication";

const isNavOpen = ref(false);

const route = useRoute();
const store = useAuthStore();
const snackbar = useSnackbar();
const { logout } = store;

const handleLogout = async () => {
  const response = await axiosClient.post("/logout");
  if (response) {
    snackbar.add({
      type: "success",
      text: response?.data?.message,
    });
    logout();
    navigateTo("/login");
  }
};

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      isNavOpen.value = false;
    }
  }
);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const isActive = (routePath) => {
  return route.path === routePath
    ? "text-[#00da9f] bg-gray-200 md:text-[#00da9f]"
    : "text-gray-900 md:hover:text-[#00da9f] dark:text-white md:dark:hover:text-[#00da9f] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
};
</script>
