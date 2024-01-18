import { useLocation } from "react-router-dom";

const useActive = () => {
  const { pathname } = useLocation();

  const isActive = (path) => {
    return path === pathname ? true : false;
  };

  return { isActive };
};

export default useActive;
