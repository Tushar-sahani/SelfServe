import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuMailPlus } from "react-icons/lu";
import getProfileModel from "../model/getProfileModel";
import getAllPost from "../model/getAllPost";
import getAllBlog from "../model/getAllBlog";
import ProfilePostPage from "../components/ProfilePostPage";
import ProfileBlogPage from "../components/ProfileBlogPage";
import PostButton from "../components/PostButton";

const ProfilePage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [totalPostPages, setTotalPostPages] = useState(0);
  const [handelPostBlog, setHandelPostBlog] = useState("post");

  const { token, isAuthenticated } = useSelector((store) => store.auth);
  const { user, error: profileError, loading } = getProfileModel(id);

  const { posts: personalPost } = getAllPost(id, page, "5");
  const { blogs: personalBlog } = getAllBlog(id, page, "5");

  useEffect(() => {
    if (handelPostBlog === "post" && personalPost) {
      setTotalPostPages(personalPost.totalPages);
      setPosts(personalPost.content);
    } else if (handelPostBlog === "blog" && personalBlog) {
      setTotalPostPages(personalBlog.totalPages);
      setBlogs(personalBlog.content);
    }
  }, [personalPost, personalBlog, handelPostBlog]);

  const handelPrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handelNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPostPages - 1));
  };

  return (
    <>
      {isAuthenticated && <PostButton category={handelPostBlog} />}
      <div className="md:w-2/3 2xl:w-1/2 p-4 md:p-0 m-auto mb-24">
        <div className="p-8 bg-white shadow mt-24 border-t-2 border-[#4C1A84]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-14 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{posts?.length}</p>
                <p className="text-gray-400">Posts</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-32 h-32 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={user?.profileImage}
                  alt={user?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="md:space-x-8 flex justify-evenly mt-20 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-[#4C1A84] hover:bg-[#34115c] shadow hover:shadow-lg transition transform hover:-translate-y-0.5">
                <LuMailPlus className="text-3xl" />
              </button>
            </div>
          </div>
          <div className="mt-10 text-center border-b md:pb-12 pb-5">
            <h1 className="text-4xl font-medium text-gray-700">{user.name}</h1>
            <p className="font-light text-gray-600 mt-3">Noida</p>
            <p className="mt-4 text-gray-500">{user.summary}</p>
          </div>
          <div className="md:mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.
            </p>
          </div>
        </div>
        <div className="p-8 bg-white mt-2">
          <div className="flex gap-10">
            <button
              className={`text-lg font-bold ${handelPostBlog === "post" ? "text-[#d60b8c]" : ""}`}
              onClick={() => setHandelPostBlog("post")}
            >
              Posts
            </button>
            <button
              className={`text-lg font-bold ${handelPostBlog === "blog" ? "text-[#d60b8c]" : ""}`}
              onClick={() => setHandelPostBlog("blog")}
            >
              Blogs
            </button>
          </div>

          {handelPostBlog === "post" ? (
            <ProfilePostPage
              posts={posts}
              isAuthenticated={isAuthenticated}
              token={token}
              setPosts={setPosts}
            />
          ) : (
            <ProfileBlogPage
              blogs={blogs}
              isAuthenticated={isAuthenticated}
              token={token}
              setBlogs={setBlogs}
            />
          )}
          <div className="flex justify-between">
            <button
              className={`bg-[#4C1A84] text-white font-bold py-2 px-4 rounded-l disabled:cursor-not-allowed disabled:opacity-0`}
              disabled={page === 0}
              onClick={handelPrev}
            >
              Prev
            </button>
            <button
              className={`bg-[#4C1A84] text-white font-bold py-2 px-4 rounded-r disabled:cursor-not-allowed  disabled:opacity-0`}
              disabled={page >= totalPostPages - 1}
              onClick={handelNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Modal = ({ setDeleteModel, setDeleteConfirmation }) => {
  const handleOkClick = () => {
    setDeleteConfirmation(true);
    setDeleteModel(false);
  };

  return (
    <>
      <div
        className="bg-[#00000053] w-screen h-screen left-0 top-0 fixed z-40"
        onClick={() => setDeleteModel(false)}
      ></div>
      <div className="fixed max-md:w-11/12 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] p-4 text-center bg-white rounded-lg shadow dark:bg-[#1f0c35] sm:p-5 z-50">
        <button
          onClick={() => setDeleteModel(false)}
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <svg
          className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this Post?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setDeleteModel(false)}
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            onClick={handleOkClick}
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
