import React from "react";
import SearchSection from "../views/SearchSection";
import Sidebar from "./SideBar";
import PostButton from "../components/PostButton";
import { Outlet } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <SearchSection title={null} description={null} />
      <PostButton category={"post"} />
      <div className="flex flex-col md:flex-row p-4 lg:p-[0px_10rem_0px_10rem] ">
        <div className="flex-1">
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Hero;
