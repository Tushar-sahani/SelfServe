import React, { useState, useEffect } from "react";
import { PostData } from "../utils/PostData";
import useFormate from "../hooks/useFormate";
import axios from "axios";

const Recommendation = ({ tags }) => {
  const [recommendPost, setRecommendPost] = useState([]);

  // useEffect(() => {
  //   const getRecommendedPost = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://${import.meta.env.VITE_IP_ADDRESS}:${
  //           import.meta.env.VITE_PORT
  //         }/api/article/recommend`,
  //         {
  //           tags: tags,
  //         }
  //       );

  //       console.log(response);
        
  //       if (response.data.apiResponseCode === "200") {
  //         if (response.data.apiResponseData.responseCode === "200") {
  //           setRecommendPost(response.data.apiResponseData.responseData);
  //         } else {
  //           setError(response.data.apiResponseData.responseMessage);
  //         }
  //       } else {
  //         setError(response.data.apiResponseMessage);
  //       }
  //     } catch (error) {
  //       const errorMessage =
  //         error.response?.data?.message || "Failed to Get recommendation post";
  //       setError(errorMessage);
  //     }
  //   };

  //   getRecommendedPost();
  // }, [tags]);
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-10 bg-white mt-10 rounded-md">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          <h1 className="font-semibold text-xl inline-block">Recomendation</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PostData.map((post, i) => (
          <div
            className="rounded overflow-hidden shadow-lg flex flex-col"
            key={i}
          >
            <a href="#"></a>
            <div className="relative md:h-36">
              <a href="#">
                <img
                  className="w-full md:h-36"
                  src={post.coverImg}
                  alt={post.title}
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </a>
            </div>
            <figcaption className="flex items-center  p-2 ">
              <img
                className="rounded-full w-9 h-9"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                alt="profile picture"
              />
              <div className="font-medium text-left ms-3">
                <div className="text-sm">Bonnie Green</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 ">
                  Developer
                </div>
              </div>
            </figcaption>
            <div className="px-3 py-1 mb-auto">
              <a
                href="#"
                className=" text-md inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
              >
                {post.title}
              </a>
              <p className="text-gray-500 text-sm">
                {post.description.slice(0, post.description.indexOf(".") + 1)}
              </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <span
                href="#"
                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
              >
                <span className="ml-1">{useFormate(post.postDate)}</span>
              </span>

              <span
                href="#"
                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
              >
                <span className="ml-1">
                  {post.statistics.comments} Comments
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
