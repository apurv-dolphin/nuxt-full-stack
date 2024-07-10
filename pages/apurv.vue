<template>
  <div class="flex items-center justify-center">
    <h1 class="text-3xl font-bold text-center text-gray-800">Apurv</h1>
  </div>
</template>

<script>
export default {
  name: "Apurv",
  setup() {
    definePageMeta({
      middleware: "auth",
    });
  },
};
</script>

<style scoped>
/* Scoped styles to avoid conflicts */
</style>
