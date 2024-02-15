

import React from "react";
import { whichLink } from "./navLinks";
import Link from "next/link";
import useActive from "../../hooks/useActive";

const Sidebar = ({ from }) => {
  const arrLink = whichLink()

  return (
    <div className={`d-flex flex-column  px-2 ${from === "drawer" ? "" : "py-4"}`}>
      {from !== "drawer" && <h6>HadiScript</h6>}
      <div className="mt-2">
        {arrLink?.map((x, index) => (
          <Link key={index} href={x.path} className={`${x.topGap ? "mt-5" : "mt-4"} gap-2 d-flex justify-content-start align-items-center ${useActive(x.path)}`}>
            {x.icon}
            <span>{x.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
