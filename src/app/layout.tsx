import React, { ReactNode } from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property-rentals | Find the best Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals,find properties",
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
