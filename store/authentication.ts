import { defineStore } from "pinia";
import axiosClient from "~/service/runtimeConfig";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    token: null as string | null,
  }),
  actions: {
    async login(token: string) {
      this.token = token;
      // Store token in cookie
      Cookies.set("token", token, { expires: 1 / 24 });
      await this.validateToken();
    },
    logout() {
      this.authenticated = false;
      this.token = null;
      Cookies.remove("token");
    },
    async validateToken() {
      const validToken = Cookies.get("token"); // Retrieve token from cookie
      const data = this.token !== null ? this.token : validToken;

      try {
        if (data) {
          const response = await axiosClient.post("/validateToken", {
            token: this.token !== null ? this.token : validToken,
          });

          if (response.data.valid) {
            this.authenticated = true;
          } else {
            this.logout();
          }
        }
      } catch (error) {
        this.logout();
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
});
