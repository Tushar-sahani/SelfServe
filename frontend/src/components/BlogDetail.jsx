import React, { useEffect, useState } from "react";
import { RiShareForward2Fill } from "react-icons/ri";
import RecentPost from "./RecentPost";
import { BiSolidLike } from "react-icons/bi";
import useFormate from "../hooks/useFormate";
import { Markup } from "interweave";
import { Link, useParams } from "react-router-dom";
import blogDetailModel from "../model/blogDetailModel";
import getAllBlog from "../model/getAllBlog";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handelModal } from "../redux/slices/handelLoginSlice";
import ScrollToTop from "./ScrollToTop";

const PostDetail = () => {
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likecount, setlikecount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isAuthenticated, token, userInfo } = useSelector(
    (store) => store.auth
  );

  const { blog } = blogDetailModel(id);

  const isPresent =
    isAuthenticated && blog?.likedUserIds?.includes(userInfo.id);

  useEffect(() => {
    if (isPresent !== undefined) {
      setIsLiked(isPresent);
    }
    setlikecount(blog.likeCount);
  }, [isPresent, blog]);

  const articledata = {
    blogId: id,
    userId: userInfo?.id,
  };

  //This handel the like and dislike
  const handleLikedToggle = async () => {
    if (!isAuthenticated) {
      dispatch(handelModal(true));
      return;
    }
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/blog/likes`,
        articledata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.apiResponseCode === "200" &&
        response.data.apiResponseData.responseCode === "200"
      ) {

        setlikecount(response.data.apiResponseData.responseData.likeCount);
        setIsLiked((prev) => !prev);
      } else {
        setError(response.data.apiResponseData.responseMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update like";
      setError(errorMessage);
    }
  };

  //All other blog related to the current post user
  const { blogs: allblog } = getAllBlog(blog?.user?.id);
  ////console.log(allblog);
  

  return (
    <>
      <ScrollToTop />
      <div className="flex justify-center bg-gray-100 py-8">
        <div className="relative md:w-20 z-50">
          <div className="fixed flex flex-col max-md:bottom-0 max-md:flex-row max-md:justify-evenly max-md:w-full max-md:bg-white">
            <button
              className="mb-4 p-2 max-md:flex gap-2"
              onClick={handleLikedToggle}
            >
              <BiSolidLike
                className={`text-3xl ${isLiked ? "text-blue-500" : ""}`}
              />
              <p className="text-sm max-md:text-xl max-md:m-auto">
                {likecount}
              </p>
            </button>
            <button className="mb-4 p-2 max-md:flex">
              <RiShareForward2Fill className="text-3xl" />
            </button>
          </div>
        </div>

        <div className="flex max-md:flex-wrap justify-center">
          <div className="xl:w-[56rem]">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg p-6 flex-grow overflow-hidden break-words">
              <img
                src={blog?.coverImage}
                alt={blog.title}
                className="w-full "
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <Link to={`/user/${blog?.user?.id}`}>
                    <img
                      className="w-12 h-12 rounded-full mr-4"
                      src={blog?.user?.profileImage}
                      alt="User avatar"
                    />
                  </Link>
                  <div>
                    <Link to={`/user/${blog?.user?.id}`}>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {blog?.user?.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500">
                      Posted on {useFormate(blog?.createdAtDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <h1 className="md:text-3xl break-all text-xl font-bold text-gray-900">
                  {blog?.title}
                </h1>
                <div className="flex flex-wrap items-center space-x-1 md:space-x-2 mt-2">
                  {blog?.tagList?.map((tag, i) => (
                    <span key={i} className="sm:text-sm text-xs text-[#4c1886]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-gray-700 overflow-x-scroll scrollhide">
                <Markup content={blog?.content || "Content not available"} />
              </div>
            </div>
            {/* <Recommendation tags={blog.tagList} /> */}
          </div>

          <div className="md:ml-8 p-4 w-96 max-md:w-full">
            <div className="text-center bg-white relative">
              <div className="bg-[#d60b8c] w-full h-1 mt-10"></div>
              <Link to={`/user/${blog?.user?.id}`}>
                <img
                  className="w-24 h-24 rounded-full mx-auto mb-4 -mt-10 hover:scale-95 hover:border-[#d60b8c] hover:border-2"
                  src={blog?.user?.profileImage}
                  alt="User avatar"
                />
              </Link>
              <h2 className="text-lg font-semibold text-gray-900">
                {blog?.user?.name}
              </h2>
              <p className="text-sm text-gray-500">{blog?.user?.summary}</p>
              <div className="pt-3">
                <button className="bg-[#4C1A84] w-4/5 p-1 text-white rounded-md">
                  Follow
                </button>
              </div>
              <p className="p-4 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, est? Lorem ipsum dolor lorem shife sit amet consectetur
                adipisicing elit. Minima, in.
              </p>
              <div className="text-left ml-12 pb-5">
                <div>
                  <h6 className="text-base">Location</h6>
                  <span className="text-sm text-gray-500">Sector 60 Nodia</span>
                </div>
                <div>
                  <h6 className="text-base">Experience</h6>
                  <span className="text-sm text-gray-500">3 Years</span>
                </div>
              </div>
            </div>
            <div className="bg-white mt-5 p-4 md:sticky md:top-28">
              <h3 className="font-semibold mb-5">
                More Blogs from {blog?.user?.name}
              </h3>
              <div>
                {allblog.length <= 1
                  ? `No more Post from ${blog?.user?.name}`
                  : allblog
                      ?.filter((post) => post.id !== id)
                      .slice(0, 4)
                      .map((post) => (
                        <Link to={`/blog/${post.id}`} key={post.id}>
                          <RecentPost post={post} />
                        </Link>
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
