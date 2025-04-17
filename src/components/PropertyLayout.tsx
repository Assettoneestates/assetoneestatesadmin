import type React from "react";

interface PropertyLayoutProps {
  children: React.ReactNode;
}

const PropertyLayout: React.FC<PropertyLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
};

export default PropertyLayout;
