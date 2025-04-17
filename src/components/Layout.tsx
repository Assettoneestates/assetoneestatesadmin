"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Home,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  Building,
  Bell,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    // Show confirmation modal before logout
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("accessTokenAttachment");
      navigate("/login");
    }
  };

  // Check if the current path matches the link path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem: React.FC<NavItemProps> = ({ icon, label, to, onClick }) => {
    const active = to ? isActive(to) : false;

    const content = (
      <div
        className={`flex items-center justify-between p-2 my-1 rounded-lg transition-all duration-200 group ${
          active
            ? "bg-green-100 text-green-700 font-medium"
            : "text-gray-600 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`${active ? "text-green-600" : "text-gray-500 group-hover:text-green-500"}`}
          >
            {icon}
          </div>
          <span
            className={`transition-opacity duration-200 ${collapsed ? "opacity-0" : "opacity-100"}`}
          >
            {label}
          </span>
        </div>
        {active && <div className="h-2 w-2 bg-green-500 rounded-full"></div>}
      </div>
    );

    if (to) {
      return <Link to={to}>{content}</Link>;
    }
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 h-full transition-all duration-300 ease-in-out ${
          collapsed ? "w-16" : "w-64"
        } bg-white shadow-lg border-r border-gray-100`}
      >
        {/* Header */}
        <div className="h-16 bg-green-600 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white bg-opacity-20 rounded-lg p-1">
              <Building className="h-6 w-6 text-white" />
            </div>
            <h1
              className={`text-white text-lg font-bold transition-opacity duration-200 ${
                collapsed ? "opacity-0 hidden" : "opacity-100"
              }`}
            >
              AssetTone
            </h1>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white opacity-80 hover:opacity-100 hidden md:block"
          >
            <ChevronRight
              className={`h-5 w-5 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white opacity-80 hover:opacity-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User section */}
        <div
          className={`px-4 py-4 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-700 font-medium">AP</span>
            </div>
            <div
              className={`transition-opacity duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}
            >
              <p className="font-medium text-sm text-gray-800">Admin Panel</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`p-4 flex flex-col justify-between h-[calc(100%-8rem)]`}
        >
          <div>
            <p
              className={`text-xs uppercase text-gray-400 font-medium mb-2 ml-2 ${
                collapsed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-200`}
            >
              Main Menu
            </p>

            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              to="/"
            />

            <NavItem
              icon={<Users size={18} />}
              label="Landlords"
              to="/landlords"
            />

            <NavItem
              icon={<Home size={18} />}
              label="Properties"
              to="/properties"
            />

            <div
              className={`mt-6 mb-3 border-t border-gray-100 pt-3 ${
                collapsed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-200`}
            >
              <p className="text-xs uppercase text-gray-400 font-medium mb-2 ml-2">
                System
              </p>
            </div>

            <NavItem
              icon={<Settings size={18} />}
              label="Settings"
              to="/settings"
            />

            <NavItem
              icon={<HelpCircle size={18} />}
              label="Help & Support"
              to="/support"
            />
          </div>

          <div className="mt-auto">
            <div
              className={`mb-4 p-3 bg-green-50 rounded-lg ${collapsed ? "hidden" : "block"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-green-700">
                  System Status
                </span>
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              </div>
              <p className="text-xs text-gray-600">All systems operational</p>
            </div>

            <NavItem
              icon={<LogOut size={18} />}
              label="Logout"
              onClick={handleLogout}
            />
          </div>
        </nav>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Top header bar */}
        <header className="h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden mr-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-medium text-gray-800">
              {location.pathname === "/" && "Dashboard"}
              {location.pathname === "/landlords" && "Landlord Management"}
              {location.pathname === "/properties" && "Property Listings"}
              {location.pathname === "/settings" && "System Settings"}
              {location.pathname === "/support" && "Help & Support"}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
            </button>

            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-medium text-sm">AP</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
