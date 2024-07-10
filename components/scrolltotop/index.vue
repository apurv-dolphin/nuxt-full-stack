<template>
  <button
    type="button"
    class="!fixed bottom-5 end-5 hidden rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
    id="btn-back-to-top"
    @click="scrollToTop"
  >
    <span class="[&>svg]:w-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </span>
  </button>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";

export default {
  name: "ScrollToTop",
  setup() {
    const handleScroll = () => {
      const btn = document.getElementById("btn-back-to-top");
      if (window.scrollY > 100) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      scrollToTop,
    };
  },
};
</script>

<style scoped>
#btn-back-to-top {
  display: none;
}
#btn-back-to-top.show {
  display: block;
}
</style>
