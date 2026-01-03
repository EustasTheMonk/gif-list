import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import {SearchBar} from "@/components/SearchBar/SearchBar.tsx";

export const CoreLayout: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <Outlet />
      <Toaster />
    </div>
  );
};
