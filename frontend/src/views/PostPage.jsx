import React, { useEffect, useState } from "react";
import FiltureTab from "../components/FiltureTab";
import Posts from "../components/Posts";
import Shimmer from "../components/Shimmer";
import { PostData } from "../utils/PostData";
import filterContentModel from "../model/filterContentModel";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { filterText } = useSelector((state) => state.filter);
  const { loading, posts, error } = filterContentModel(filterText);

  return (
    <>
      <FiltureTab />
      {loading ? <Shimmer /> : <Posts posts={posts} />}
    </>
  );
};

export default PostPage;
