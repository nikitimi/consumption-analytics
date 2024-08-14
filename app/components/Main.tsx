import React from "react";
import Header from "@/app/components/Header";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <Header />
      {children}
    </main>
  );
};

export default Main;
