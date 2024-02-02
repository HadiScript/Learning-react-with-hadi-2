import { Cast, Compass, LogOut, ShoppingBag, Terminal, User, Wind } from "react-feather";

export const AgentLinks = [
  {
    path: "/agent",
    title: "Dashboard",
    icon: <Compass size={18} />,
    topGap: false,
  },
  {
    path: "/agent/tickets/bucket",
    title: "Bucket",
    icon: <ShoppingBag size={18} />,
    topGap: true,
  },
  {
    path: "/agent/tickets/picked",
    title: "Picked Tickets",
    icon: <Terminal size={18} />,
    topGap: false,
  },

  {
    path: "/agent/tickets/handover",
    title: "Handover Tickets",
    icon: <Wind size={18} />,
    topGap: false,
  },

  {
    path: "/agent/tickets/assign",
    title: "Assign Tickets",
    icon: <Cast size={18} />,
    topGap: false,
  },
  {
    path: "",
    title: "Profile",
    icon: <User size={18} />,
    topGap: true,
  },

  {
    path: "",
    title: "Logout",
    icon: <LogOut size={18} />,
    topGap: false,
  },
];
