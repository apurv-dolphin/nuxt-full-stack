import { useAuthStore } from "~/store/authentication";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const cookieToken = useCookie("token");
  const token = cookieToken.value || authStore.token;

  if (!token) {
    return navigateTo("/login");
  }
});
