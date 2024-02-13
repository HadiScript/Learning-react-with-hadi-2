import { API } from "@/actions/api";
import axios from "axios";

export default function buildClient(appContext) {
  const axiosInstance = axios.create({
    baseURL: `${API}`,
    // Other configurations...
  });

  // console.log(req);

  if (typeof window === "undefined") {
    // We are on the server, forward the cookie from the incoming request
    axiosInstance.defaults.headers.common["session"] = appContext.ctx.req.headers.cookie.split("=")[1] || "";
  }

  return axiosInstance;
}
