import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen max-md:p-2 mb-7 md:w-3/4 lg:w-10/12 m-auto">
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <Card data={post} />
        </Link>
      ))}
    </div>
  );
};

export default Posts;
