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
import { computed, onMounted, watch } from "vue";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import { useAuthStore } from "~/store/authentication";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const isAuthenticated = computed(() => authStore.isAuthenticated);
onMounted(async () => {
  await authStore.validateToken();
});

watch(
  () => route.fullPath,
  async () => {
    await authStore.validateToken();
  }
);
</script>
