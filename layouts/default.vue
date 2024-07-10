<template>
  <div class="flex flex-col min-h-screen">
    <Header v-if="isAuthenticated" />
    <main class="flex-grow px-6 mt-4">
      <slot />
    </main>
    <Scrolltotop />
    <Footer v-if="isAuthenticated" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import { useAuthStore } from "~/store/authentication";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
onMounted(async () => {
  await authStore.validateToken();
});
</script>
