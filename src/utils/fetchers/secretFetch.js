import axios from "axios";
import { toast } from "react-hot-toast";

const secretFetch = axios.create({
  withCredentials: true,
});

secretFetch.interceptors.request.use(
  async (config) => {
    try {
      const { newAccessToken, status, message } = await fetch(
        "/api/auth/refresh",
        { credentials: "include" }
      );

      if (newAccessToken) {
        await fetch("/api/auth", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newAccessToken: data?.newAccessToken }),
          credentials: "include",
        });
      }

      if (status > 201) {
        toast.error(message || "توکن معتبر نیست");
        window.location.pathname = "/";
        return Promise.reject(new Error("Invalid token"));
      }
    } catch (error) {
      toast.error("خطا در بروزرسانی توکن");
      window.location.pathname = "/";
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

secretFetch.interceptors.response.use((res) => res.data);

export default secretFetch;
