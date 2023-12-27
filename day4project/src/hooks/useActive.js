import React from "react";
import { useLocation } from "react-router-dom";

const useActive = () => {
  const location = useLocation().pathname;
  // url /explore/accordions

  const isActive = (path) => { //hadi
    return location === path ? true : false; // explore === hadi -> faSE
  };

  return { isActive };
};

export default useActive;
