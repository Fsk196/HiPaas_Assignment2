import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdSpaceDashboard, MdInventory2, MdSettings } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";
import { BiSolidUserBadge } from "react-icons/bi";

export const adminItem = [
  {
    id: 1,
    title: "Admin",
    path: "/admin",
    icon: BiSolidUserBadge,
  },
  {
    id: 2,
    title: "Dashboard",
    path: "/",
    icon: MdSpaceDashboard,
  },
  {
    id: 3,
    title: "Transactions",
    path: "/transaction",
    icon: FaMoneyBillTrendUp,
  },
  {
    id: 4,
    title: "Notes",
    path: "/note",
    icon: GiNotebook,
  },
  {
    id: 5,
    title: "Inventory",
    path: "/inventory",
    icon: MdInventory2,
  },
  {
    id: 6,
    title: "Reports",
    path: "/report",
    icon: TbReport,
  },
  {
    id: 7,
    title: "Settings",
    path: "/setting",
    icon: MdSettings,
  },
  {
    id: 8,
    title: "Chat",
    path: "/chat",
    icon: IoChatbubbleEllipsesSharp,
  },
  {
    id: 9,
    title: "Employe",
    path: "/employe",
    icon: BiSolidUserBadge,
  },
];

export const getTitle = (location) => {
  switch (location.pathname) {
    case "/transaction":
      return "Transaction";
    case "/note":
      return "Note";
    case "/employe":
      return "Employe";
    case "/inventory":
      return "Inventory";
    case "/report":
      return "Report";
    case "/setting":
      return "Setting";
    case "/chat":
      return "Chat";
    case "/admin":
      return "Admin";
    default:
      return "Dashboard";
  }
};
