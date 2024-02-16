'use client'

import { _useAuth } from "@/context/Auth";
import { Cast, Check, Compass, LogOut, ShoppingBag, Terminal, User, Wind } from "react-feather";

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
    path: "/agent/tickets/resolved",
    title: "Resolved Tickets",
    icon: <Check size={18} />,
    topGap: true,
  },

  {
    path: "",
    title: "Profile",
    icon: <User size={18} />,
    topGap: true,
  },


];


export const AdminLinks = [
  {
    path: "/admin",
    title: "Dashboard",
    icon: <Compass size={18} />,
    topGap: false,
  },
  {
    path: "/admin/tickets",
    title: "All Tickets",
    icon: <ShoppingBag size={18} />,
    topGap: true,
  },
  {
    path: "/admin/tickets/escalated",
    title: "Escalated",
    icon: <Terminal size={18} />,
    topGap: false,
  },

  {
    path: "/admin/users/agents",
    title: "Agents",
    icon: <Wind size={18} />,
    topGap: true,
  },

  {
    path: "/admin/users/clients",
    title: "Clients",
    icon: <Cast size={18} />,
    topGap: false,
  },
  {
    path: "/admin/categories",
    title: "Categories",
    icon: <Check size={18} />,
    topGap: true,
  },

  {
    path: "",
    title: "Profile",
    icon: <User size={18} />,
    topGap: true,
  },


];


export const whichLink = () => {
  const [auth] = _useAuth()

  if (auth?.role === 'agent') {
    return AgentLinks;
  } else if (auth?.role === 'admin') {
    return AdminLinks;
  } else {
    return []; //clientLinks
  }
}
