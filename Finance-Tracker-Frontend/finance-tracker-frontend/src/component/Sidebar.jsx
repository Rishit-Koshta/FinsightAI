

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  CreditCard,
  Bot,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: CreditCard },
    { name: "AI Assistant", path: "/ai", icon: Bot },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0b1f17] to-[#07140f] text-white flex flex-col justify-between fixed left-0 top-0 p-5 border-r border-white/5">

      {/* Logo */}
      <div>
        <h1 className="text-xl font-semibold mb-10 flex items-center gap-2 tracking-wide">
          <span className="bg-green-400 text-black px-2 py-1 rounded-md text-sm font-bold">
            FA
          </span>
          Finsight AI
        </h1>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300
                ${
                  isActive
                    ? "bg-green-500/10 text-green-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r-md"></span>
                )}

                {/* Icon */}
                <Icon
                  size={18}
                  className={`transition ${
                    isActive
                      ? "text-green-400"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />

                {/* Text */}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">

        {/* User Card */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/5">
          <div className="w-9 h-9 bg-green-400 text-black flex items-center justify-center rounded-full text-sm font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div className="text-sm">
            <p className="text-white font-medium">
              {user?.name || "User"}
            </p>
            <p className="text-gray-400 text-xs">Active</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-600 transition text-white py-2.5 rounded-xl text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;