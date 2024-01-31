import { LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { _useAuth } from "../../../logic/context/AuthContext";
import { agentNavList, clientNavList } from "./NavLists";
import { _useLogin } from "../../../logic/actions/_common";

const Sidebar = () => {
  const [auth] = _useAuth();
  const { logout } = _useLogin();

  const role = auth?.user?.role;
  const NavList = role === "client" ? clientNavList : role === "agent" ? agentNavList : role === "admin" ? agentNavList : [];

  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        <h4>{role}</h4>
      </div>
      <div className="py-1 ">
        <Menu>
          {NavList.map((x, index) => (
            <Menu.Item
              key={index}
              className={`${x.gap ? "mt-4" : "mt-1"} nav-link`}
              icon={
                <Link className="_link its-icon" to={x.path}>
                  {x.Icon}
                </Link>
              }
            >
              <Link className="_link" to={x.path}>
                {x.name}
              </Link>
            </Menu.Item>
          ))}

          <Menu.Item
            key="99"
            className="mt-4 nav-link"
            onClick={logout}
            icon={
              <div className="its-icon">
                <LogoutOutlined />
              </div>
            }
          >
            <span> Logout</span>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Sidebar;
