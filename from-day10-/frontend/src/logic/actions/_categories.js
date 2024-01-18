import axios from "axios";
import { useEffect, useState } from "react";

export const _useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/category");
      console.log(res);
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      alert("Sorry, failed try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return { loading,  categories };
};
