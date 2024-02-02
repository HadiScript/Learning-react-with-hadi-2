import { usePathname } from "next/navigation";

const useActive = (path) => {
  const pathname = usePathname();

  return path === pathname && pathname.includes(path) ? "selected-item-manu" : "item-manu";
};

export default useActive;
