import { AppstoreOutlined, DiffOutlined, LogoutOutlined, OrderedListOutlined, ProfileOutlined, SettingOutlined } from "@ant-design/icons";

export const clientNavList = [
  {
    gap: false,
    name: "Open Requests",
    path: "/_/open-requests",
    Icon: <DiffOutlined />,
  },
  {
    gap: false,
    name: "Submit Request",
    path: "/_/submit-request",
    Icon: <OrderedListOutlined />,
  },
  {
    gap: false,
    name: "Resolved Requests",
    path: "/_/resolved-requests",
    Icon: <SettingOutlined />,
  },
  {
    gap: true,
    name: "Profile",
    path: "/_/update-profile",
    Icon: <ProfileOutlined />,
  },
];

export const agentNavList = [
  {
    gap: false,
    name: "Dashboard",
    path: "/agent/dashboard",
    Icon: <AppstoreOutlined />,
  },
  {
    gap: true,
    name: "Bucket",
    path: "/agent/bucket",
    Icon: <OrderedListOutlined />,
  },
  {
    gap: false,
    name: "Picked",
    path: "/agent/picked-tickets",
    Icon: <DiffOutlined />,
  },
  {
    gap: false,
    name: "Handovers",
    path: "/agent/handover-to-me",
    Icon: <SettingOutlined />,
  },

  {
    gap: false,
    name: "Assigned",
    path: "/agent/assgin-to-me",
    Icon: <SettingOutlined />,
  },

  {
    gap: false,
    name: "Resolved",
    path: "/agent/resolved-ticket",
    Icon: <SettingOutlined />,
  },

  {
    gap: true,
    name: "Profile",
    path: "/_/update-profile",
    Icon: <ProfileOutlined />,
  },
];
