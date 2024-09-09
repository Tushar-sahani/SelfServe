import React from "react";
import { articles } from "../utils/blogData";
import BlogCard from "../components/BlogCard";
import BlogShimmer from "../components/BlogShimmer";
import { useNavigate } from "react-router-dom";

function Blog() {

  const navigate = useNavigate();
  return (
    <div className="w-full md:w-2/3 m-auto md:p-5">
      <div className="sticky top-24 z-[99] px-5 bg-[#f7f7f7f3] max-md:bg-[#f7f7f7f5] after:content-[''] md:after:mt-4 after:block after:w-full after:h-0.5 after:bg-[#0000002e]">
        <div className={`flex max-md:flex-col md:gap-20 gap-4 pt-3`}>
          <h1 className="md:text-4xl text-xl font-extrabold text-[#000000bf] md:w-1/3">
            SelfServe Blog
          </h1>
          <div className="md:text-xl w-full mt-auto max-md:mb-3 flex justify-between">
            <div className="items-center flex gap-10">
              <span className="font-medium cursor-pointer hover:text-[#d60b8c]">
                Latest
              </span>
              <span className="font-medium  cursor-pointer hover:text-[#d60b8c]">
                Top
              </span>
            </div>
            <button
              className="px-8 bg-[#4C1A84] hover:bg-[#d60b8c] duration-200 text-white py-2 rounded  font-bold"
              onClick={()=>navigate('/new/blog')}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="max-w-7xl m-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-2 relative bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="articles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
              <span className="inline-block w-24 bg-pink-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                Inspiration
              </span>
              <h2 className="text-2xl font-bold text-white mt-4">
                5 Easy Ways You Can Turn Future Into Success
              </h2>
              <p className="text-gray-300 mt-2">Katen Doe • August 20, 2022</p>
            </div>
          </div>

          {/* Popular section */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center">
              <button className="text-white bg-pink-500 py-2 px-4 rounded-full hover:text-black">
                Popular
              </button>
              <button className="text-gray-600 py-2 px-4 rounded-full hover:text-black">
                Recent
              </button>
            </div>
            <div className="mt-4 2xl:block hidden">
              {articles.slice(0, 7).map((article, index) => (
                <div key={index} className="flex items-start mt-4">
                  <img
                    src={article.profileImg}
                    alt="articles"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-md font-semibold hover:text-[#d60b8c] cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500">{article.postDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 2xl:hidden  block">
              {articles.slice(0, 5).map((article, index) => (
                <div key={index} className="flex items-start mt-4">
                  <img
                    src={article.profileImg}
                    alt="articles"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-md font-semibold hover:text-[#d60b8c] cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500">{article.postDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated cards section */}
      <div className="p-3 flex gap-5 justify-evenly flex-col lg:flex-row mt-16 box-border ">
        <div className="relative flex-grow lg:w-[25rem] h-[22rem] bg-white rounded-sm shadow-lg overflow-hidden group">
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/397014/new-york-city.png)",
            }}
          ></div>

          <div className="absolute bottom-0 left-0 top-0 right-0 p-4 bg-white transform translate-y-[250px] transition-transform duration-500 group-hover:translate-y-0">
            <h2 className="text-md font-bold uppercase text-[#152536] tracking-wide my-1">
              Self server platform in RapiPay
            </h2>
            <h3 className="text-sm uppercase text-gray-500">Tushar Sahani</h3>
            <h3 className="text-sm uppercase text-gray-500 mb-6 pb-3 border-b border-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Software Engineer
            </h3>
            <p className="text-sm leading-7 text-gray-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Discover and share valuable insights through employee blogs,
              connect with peers, and contribute your expertise. Explore diverse
              content, engage in meaningful discussions, and enhance your
              professional growth.
            </p>
            <h3 className=" mt-5 mb-2 text-sm uppercase text-teal-500 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              event details
            </h3>
          </div>
        </div>
        <div className="relative flex-grow lg:w-[25rem] h-[22rem] bg-white rounded-sm  shadow-lg overflow-hidden group">
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/397014/new-york-city.png)",
            }}
          ></div>

          <div className="absolute bottom-0 left-0 top-0 right-0 p-4 bg-white transform translate-y-[250px] transition-transform duration-500 group-hover:translate-y-0">
            <h2 className="text-md font-bold uppercase text-[#152536] tracking-wide my-1">
              Self server platform in RapiPay
            </h2>
            <h3 className="text-sm uppercase text-gray-500">Tushar Sahani</h3>
            <h3 className="text-sm uppercase text-gray-500 mb-6 pb-3 border-b border-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Software Engineer
            </h3>
            <p className="text-sm leading-7 text-gray-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Discover and share valuable insights through employee blogs,
              connect with peers, and contribute your expertise. Explore diverse
              content, engage in meaningful discussions, and enhance your
              professional growth.
            </p>
            <h3 className=" mt-5 mb-2 text-sm uppercase text-teal-500 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              event details
            </h3>
          </div>
        </div>
        <div className="relative flex-grow lg:w-[25rem] h-[22rem] bg-white rounded-sm shadow-lg overflow-hidden group">
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/397014/new-york-city.png)",
            }}
          ></div>

          <div className="absolute bottom-0 left-0 top-0 right-0 p-4 bg-white transform translate-y-[250px] transition-transform duration-500 group-hover:translate-y-0">
            <h2 className="text-md font-bold uppercase text-[#152536] tracking-wide my-1">
              Self server platform in RapiPay
            </h2>
            <h3 className="text-sm uppercase text-gray-500">Tushar Sahani</h3>
            <h3 className="text-sm uppercase text-gray-500 mb-6 pb-3 border-b border-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Software Engineer
            </h3>
            <p className="text-sm leading-7 text-gray-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Discover and share valuable insights through employee blogs,
              connect with peers, and contribute your expertise. Explore diverse
              content, engage in meaningful discussions, and enhance your
              professional growth.
            </p>
            <h3 className=" mt-5 mb-2 text-sm uppercase text-teal-500 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              event details
            </h3>
          </div>
        </div>
      </div>

      {/* All blogs */}
      <div className="p-3">
        {articles.map((article) => (
          <BlogCard blog={article} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
