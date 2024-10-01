import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdSpaceDashboard, MdInventory2, MdSettings } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { BiSolidUserBadge } from "react-icons/bi";

export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: MdSpaceDashboard,
  },
  {
    id: 2,
    title: "Transactions",
    path: "/transaction",
    icon: FaMoneyBillTrendUp,
  },
  {
    id: 3,
    title: "Notes",
    path: "/note",
    icon: GiNotebook,
  },
  {
    id: 4,
    title: "Inventory",
    path: "/inventory",
    icon: MdInventory2,
  },
  {
    id: 5,
    title: "Reports",
    path: "/report",
    icon: TbReport,
  },
  {
    id: 6,
    title: "Settings",
    path: "/setting",
    icon: MdSettings,
  },
  {
    id: 7,
    title: "Chat",
    path: "/chat",
    icon: IoChatbubbleEllipsesSharp,
  },
  {
    id: 8,
    title: "Employe",
    path: "/employe",
    icon: BiSolidUserBadge,
  },
];

export const getTitle = (location) => {
  switch (location.pathname) {
    case "/admin":
      return "Admin";
    case "/transaction":
      return "Transaction";
    case "/note":
      return "Note";
    case "/employe":
      return "Employee";
    case "/inventory":
      return "Inventory";
    case "/report":
      return "Report";
    case "/setting":
      return "Setting";
    case "/chat":
      return "Chat";
    default:
      return "Dashboard";
  }
};
