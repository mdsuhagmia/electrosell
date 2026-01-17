import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut as LogOutIcon,
  LockKeyhole,
  History,
} from "lucide-react";
import Container from "../Container";
import LogOut from "../LogOut";
import React from "react";

const Sidebar = () => {
  const location = useLocation();

  // Menu items
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "My Orders", path: "/dashboard/my-order", icon: <History /> },
    { name: "Profile", path: "/dashboard/profile", icon: <User /> },
    { name: "Update Password", path: "/dashboard/updatepassword", icon: <LockKeyhole /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings /> },
  ];

  return (
    <section>
      <Container>
        <div className="">
          <h2 className="text-2xl font-bold my-8 text-teal-600">Dashboard</h2>
          <div className="space-y-3">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-100 font-semibold"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className: `w-5 h-5 ${
                      isActive ? "text-blue-600" : "text-gray-600"
                    }`,
                  })}
                  {item.name}
                </Link>
              );
            })}
            <div className="text-gray-600 hover:text-blue-600 hover:bg-gray-100">
              <LogOut />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Sidebar;