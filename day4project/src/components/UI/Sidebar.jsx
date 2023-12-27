import React from "react";
import { Activity, ArrowDown, Box, User } from "react-feather";
import { myStyle } from "../../assets/style/style";
import { useNavigate } from "react-router-dom";
import useActive from "../../hooks/useActive";

const sidebarNavs = [
  {
    name: "Cover",
    pathname: "/",
    icon: <Activity size={15} />,
    isDivider: true,
  },
  {
    name: "Accordion",
    pathname: "/explore/accordions",
    icon: <ArrowDown size={15} />,
    isDivider: false,
  },
  {
    name: "Card",
    pathname: "/explore/cards",
    icon: <Box size={15} />,
    isDivider: false,
  },
];

const Sidebar = ({ title }) => {
  const router = useNavigate();

  const { isActive } = useActive();

  const redirectTo = (x) => {
    router(x);
  };

  return (
    <div>
      {title && (
        <div className="p-3 h3">
          <b>Hadiscript</b>
        </div>
      )}

      <div className="p-3">
        {sidebarNavs.map((x) => (
          <React.Fragment key={x.name}>
            <div
              onClick={() => redirectTo(x.pathname)}
              role="button"
              className={`d-flex justify-content-start align-items-center gap-2 mb-3 ${isActive(x.pathname) ? "sidenavs-active" : "sidenavs"}`}
            >
              {x.icon}
              <span>{x.name} </span>
            </div>
            {x.isDivider && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
