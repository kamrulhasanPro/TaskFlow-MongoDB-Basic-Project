import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-72px-32px)] flex flex-col w-11/12 mx-auto my-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
