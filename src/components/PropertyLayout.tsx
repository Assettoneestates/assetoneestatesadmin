import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
};

export default Layout;
