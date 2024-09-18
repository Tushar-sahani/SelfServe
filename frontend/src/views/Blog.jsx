import React, { useEffect, useState } from "react";
import useFormate from "../hooks/useFormate";
import BlogCard from "../components/BlogCard";
import { Link, useNavigate } from "react-router-dom";
import Rapipay from "../assets/Rapipay1.png";
import Shimmer from "../components/Shimmer";
import axios from "axios";
const Blog = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogsData, setBlogsData] = useState([]);
  const [filterBlog, setFilterblog] = useState("latest");
  const handelPages = (index) => {
    setPage(index);
  };
  const { content, totalPages } = blogsData;

  useEffect(() => {
    const fetchAllBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/blog/allBlog?page=${page}&size=${5}&sort=${
            filterBlog == "latest" ? "createdAt" : "likeCount"
          }`
        );

        if (response.data.apiResponseCode === "200") {
          if (response.data.apiResponseData.responseCode === "200") {
            ////console.log(response.data.apiResponseData.responseData);

            setBlogsData(response.data.apiResponseData.responseData);
          } else {
            setError(response.data.apiResponseData.responseMessage);
            // ////console.log(error);
          }
        } else {
          setError(response.data.apiResponseMessage);
          //   ////console.log(error);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch posts";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlog();
  }, [page, filterBlog]);

  console.log(content);

  return (
    <div className="w-full md:w-2/3 m-auto md:p-5">
      <div className="sticky top-24 z-[99] px-5 bg-[#f7f7f7f3] max-md:bg-[#f7f7f7f5] after:content-[''] md:after:mt-4 after:block after:w-full after:h-0.5 after:bg-[#0000002e]">
        <div className={`flex md:gap-20 gap-4 pt-3`}>
          <h1 className="md:text-4xl text-xl font-extrabold text-[#000000bf] md:w-1/3">
            SelfServe Blog
          </h1>
          <div className="md:text-xl w-full mt-auto max-md:mb-3 flex justify-end">
            <button
              className="px-8 bg-[#4C1A84] hover:bg-[#d60b8c] duration-200 text-white py-2 rounded  font-bold"
              onClick={() => navigate("/new/blog")}
            >
              Write Blog
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="max-w-7xl m-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
          {/* Main Content */}
          <div className="cursor-pointer max-md:h-80 lg:col-span-2 relative bg-white rounded-xl shadow-lg overflow-hidden">
            <Link to="https://in.rapipay.com/about-us/">
              <img
                src={Rapipay}
                alt="articles"
                className="w-full h-full object-cover hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white mt-4">
                  Read about the Success of Rapipay
                </h2>
                <p className="text-gray-300 mt-2">
                  Rapipay Team • August 20, 2024
                </p>
              </div>
            </Link>
          </div>

          {/* Popular section */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center">
              <button className="text-white bg-pink-500 py-2 px-4 rounded-full hover:text-black">
                Popular
              </button>
            </div>
            <div className="mt-4 2xl:block hidden">
              {blogsData.content &&
                blogsData.content?.slice(0, 5).map((blog, index) => (
                  <Link to={`/blog/${blog?.id}`}>
                    <div key={index} className="flex items-start mt-4">
                      <img
                        src={blog?.user?.profileImage}
                        alt="blogs"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="ml-4">
                        {/* <Link to={`/blog/${blog?.id}`}> */}
                        <h3 className="text-md font-semibold hover:text-[#d60b8c] cursor-pointer">
                          {blog?.title.slice(0,50)}
                        </h3>
                        {/* </Link> */}
                        <p className="text-sm text-gray-500">
                          {useFormate(blog?.createdAtDate)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="mt-4 2xl:hidden  block">
              {blogsData.content &&
                blogsData.content?.slice(0, 5).map((blog, index) => (
                  <Link to={`/blog/${blog?.id}`}>
                    <div key={index} className="flex items-start mt-4">
                      <img
                        src={blog?.user?.profileImage}
                        alt="blogs"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="ml-4">
                        {/* <Link to={`/blog/${blog?.id}`}> */}
                        <h3 className="text-md font-semibold hover:text-[#d60b8c] cursor-pointer">
                          {blog?.title.slice(0,50)}
                        </h3>
                        {/* </Link> */}
                        <p className="text-sm text-gray-500">
                          {useFormate(blog?.createdAtDate)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated cards section */}
      <div className="p-3 flex gap-5 justify-evenly flex-col lg:flex-row mt-16 box-border ">
        {content &&
          content?.slice(0, 3)?.map((blog) => (
            <div className="relative flex-grow lg:w-[25rem] h-[22rem] bg-white rounded-sm shadow-lg overflow-hidden group">
              <div
                className="h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${blog?.coverImage})`,
                }}
              ></div>

              <div className="absolute bottom-0 left-0 top-0 right-0 p-4 bg-white transform translate-y-[250px] transition-transform duration-500 group-hover:translate-y-0">
                <h2 className="text-md font-bold uppercase text-[#152536] tracking-wide my-1">
                  {blog?.title.slice(0, 60)}
                  {blog?.title.length > 70 && "..."}
                </h2>
                <h3 className="text-sm uppercase text-gray-500">
                  {blog?.user?.name}
                </h3>
                <h3 className="text-sm uppercase text-gray-500 mb-6 pb-3 border-b border-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {blog?.user?.summary}
                </h3>
                <p className="text-sm leading-7 text-gray-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {blog.description}
                </p>
                <Link to={`/blog/${blog?.id}`}>
                  <h3 className=" mt-5 mb-2 text-sm uppercase text-teal-500 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Read More
                  </h3>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* All blogs */}
      <div>
        <h1 className="text-3xl p-3 my-4 font-bold">Daily Blogs</h1>
        <div className="items-center flex gap-12 ml-2 mx-3 text-xl bg-white p-7 sticky top-40 z-50">
          <span
            className={`font-medium cursor-pointer hover:text-[#d60b8c] ${
              filterBlog == "latest" && "text-[#d60b8c]"
            }`}
            onClick={() => {
              setFilterblog("latest");
              setPage(0);
            }}
          >
            Latest
          </span>
          <span
            className={`font-medium  cursor-pointer hover:text-[#d60b8c] ${
              filterBlog == "top" && "text-[#d60b8c]"
            }`}
            onClick={() => {
              setFilterblog("top");
              setPage(0);
            }}
          >
            Top
          </span>
        </div>
        {loading ? (
          <div className="mt-10">
            <Shimmer size={3} />
          </div>
        ) : (
          <div className="p-3">
            {content?.map((blog, i) => (
              <Link to={`/blog/${blog?.id}`} key={i}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
        )}
        <div className="w-full border-t border-gray-200 font-mono mt-16">
          <div className="flex text-2xl flex-wrap justify-center text-gray-700 -mt-px">
            {Array(totalPages)
              .fill(null)
              ?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handelPages(i)}
                  className={`p-2 mx-1 border-transparent ${
                    page === i ? "text-[#d60b8c] border-2" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
