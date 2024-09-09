import React from "react";
import SearchSection from "../views/SearchSection";
import PostPage from "./PostPage";
import Sidebar from "./SideBar";
import PostButton from "../components/PostButton";
import { useSelector } from "react-redux";

const Hero = () => {

  return (
    <>
      <SearchSection title={null} description={null} />
      <PostButton />
      <div className="flex flex-col md:flex-row p-4 lg:p-[0px_10rem_0px_10rem] ">
        <div className="flex-1">
          <PostPage />
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Hero;
