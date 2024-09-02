import React from "react";
import { PostData } from "../utils/PostData";
import FiltureTab from "../components/FiltureTab";
import Posts from "../components/Posts";

const PostPage = () => {
  return (
    <>
      <FiltureTab />
      <Posts posts={PostData}/>
    </>
  );
};

export default PostPage;
