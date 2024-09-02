import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  const [filterPost, setFilterPost] = useState(posts);
  const select = useSelector((store) => store.filter.filterText);

  useEffect(() => {
    let updatedPosts = [...posts];

    if (select === "recentpost") {
      setFilterPost(updatedPosts);
    } else if (select === "mostliked") {
      updatedPosts.sort((a, b) => b.statistics.likes - a.statistics.likes);
      setFilterPost(updatedPosts);
    } else if (select === "mostcommented") {
      updatedPosts.sort(
        (a, b) => b.statistics.comments - a.statistics.comments
      );
      setFilterPost(updatedPosts);
    }
  }, [select, posts]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-md:p-2 mb-20">
      {filterPost.slice(0, 8).map((post, index) => (
        <Link to="post" key={index}>
          <Card data={post} />
        </Link>
      ))}
    </div>
  );
};

export default Posts;
