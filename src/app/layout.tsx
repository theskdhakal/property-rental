import React, { ReactNode } from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Property-rentals | Find the best Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals,find properties",
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
