import axios from "axios";
import { useState } from "react";

export const useReq = () => {
  const [loading, setLoading] = useState(false);

  const makeReq = async (method, url, body) => {
    setLoading(true);
    try {
      const res = await axios[method](url, body);

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, makeReq };
};
