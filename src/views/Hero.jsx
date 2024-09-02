import React from "react";
import SearchSection from "../views/SearchSection";
import PostPage from "./PostPage";
import Sidebar from "./SideBar";
import PostButton from "../components/PostButton";

const Hero = () => {
  return (
    <>
    {/* <SearchSection
        title="Welcome User Name"
        description="Here you can See your colleague posts and you can also share you thoughts and information with others because the real influence is gained by sharing knowledge"
      /> */}
      <SearchSection title={null} description={null} />
      <PostButton />
      <div className="flex flex-col md:flex-row p-4 lg:p-[0px_10rem_0px_10rem] ">
        <div className="flex-1">
          <PostPage />
        </div>
        <div className="md:w-1/3">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Hero;
