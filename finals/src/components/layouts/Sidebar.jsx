

import React from "react";
import { whichLink } from "./navLinks";
import Link from "next/link";
import useActive from "../../hooks/useActive";
import { LogOut } from "react-feather";
import { useCommon } from "@/actions/common";

const Sidebar = ({ from }) => {
  const arrLink = whichLink()
  const { Logout } = useCommon()

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

        <div className={`mt-5  gap-2 d-flex justify-content-start align-items-center `} onClick={Logout} role="button">
          <LogOut size={18} />
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
