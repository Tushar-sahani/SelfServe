import React, { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuMailPlus } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import getProfileModel from "../model/getProfileModel";
import getAllPost from "../model/getAllPost";
import useFormate from "../hooks/useFormate";
import { BiSolidLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { useShortNumber } from "../hooks/useShortNumber";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const ProfilePage = () => {
  const { id } = useParams();
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const { token, isAuthenticated } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const { user, error: profileError, loading } = getProfileModel(id);
  const { posts: personalPost } = getAllPost(id);
console.log(user);

  useEffect(() => {
    if (personalPost) {
      setPosts(personalPost);
    }
  },[personalPost]);
  
  useEffect(() => {
    if (deleteConfirmation && deletedId !== null) {
      const deletePost = async () => {
        try {
          const response = await axios.delete(
            `http://${import.meta.env.VITE_IP_ADDRESS}:${
              import.meta.env.VITE_PORT
            }/api/article/deleteArticle/${deletedId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.apiResponseCode === "200") {
            if (response.data.apiResponseData.responseCode === "200") {

              setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedId));
              setDeletedId(null);
              toast.success("Post deleted successfully!",{autoClose:1500});
            } else {
              setError(response.data.apiResponseData.responseMessage);
            }
          } else {
            setError(response.data.apiResponseMessage);
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to delete post";
          setError(errorMessage);
        } finally {
          setDeleteConfirmation(false);
        }
      };

      deletePost();
    }
  }, [deleteConfirmation]);

  



  return (
    <>
      {deleteModel && (
        <Modal
          setDeleteModel={setDeleteModel}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      <div className="md:w-1/2 p-4 md:p-0 m-auto mb-24">
        <div className="p-8 bg-white shadow mt-24 border-t-2 border-[#4C1A84]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-14 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{posts.length}</p>
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
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
          </div>
        </div>
        <div className="p-8 bg-white mt-2">
          <h1 className="text-lg font-bold">All Post</h1>
          <div className="mt-5">
            {posts.length === 0 ? (
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <CiImageOn className="text-7xl m-auto" />
                  <h1 className="mt-4 text-2xl font-semibold text-gray-700">
                    No Posts Yet
                  </h1>
                  <p className="mt-2 text-gray-500">
                    When you share posts, they will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center max-md:p-2 mb-7 md:w-4/5 lg:w-10/12">
                {posts.map((data) => (
                  <div
                    key={data.id}
                    className="relative bg-white shadow-md text-black rounded-sm p-6 mb-4 md:w-80 lg:w-[45vw] m-auto"
                  >
                    <Link to={`/post/${data.id}`}>
                      <div className="flex items-center">
                        <img
                          src={data?.user?.profileImage}
                          alt={data?.user?.name}
                          className="md:w-16 md:h-16 w-12 h-12 rounded-full mr-3 cursor-pointer border-2 border-[#d60b8c] hover:border-green-600"
                        />

                        <div>
                          <h2 className="lg:text-lg md:text-md max-md:text-xs font-bold cursor-pointer hover:text-[#d60b8c] mb-1">
                            {data.title}
                          </h2>
                          <div className="text-[#2a2836] text-sm">
                            <span>{data?.user?.name} </span>
                            <span className="mr-2 ml-2">•</span>
                            <span>{useFormate(data.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {isAuthenticated && (
                      <div className="flex md:gap-8 gap-4 absolute right-4 top-2 md:top-5 md:right-2 z-50 mt-5 md:mt-0">
                        <button className="text-[#4C1A84] md:text-3xl" onClick={()=>navigate(`/edit/${data.id}`)}>
                          <BiEdit />
                        </button>
                        <button
                          className="text-red-500 md:text-3xl"
                          onClick={() => {
                            setDeletedId(data.id);
                            setDeleteModel(true);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}

                    <div className="md:ml-16 p-2 border-b">
                      <p className="text-gray-700 max-md:hidden mb-4 ">
                        {data.description}
                      </p>
                      <p className="text-gray-700 md:hidden max-md:text-sm mb-4">
                        {data.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center md:ml-14 md:space-x-8 space-x-3 max-md:justify-evenly text-gray-600 p-3">
                      <div className="flex items-center">
                        <BiSolidLike className=" mr-1" />
                        <span>{useShortNumber(data.likeCount)}</span>
                      </div>

                      <div className="flex items-center">
                        <FaBookReader className="mr-1" />
                        <span>{data.readingTimeMinutes} min</span>
                      </div>
                      <div className="flex items-center">
                        <BsChatDots className="mr-1" />
                        <span>{useShortNumber(data.commentsCount)} </span>
                      </div>

                      <div className="flex items-center">
                        <MdVisibility className="mr-1" />
                        <span>{useShortNumber(11143)} </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Modal = ({ setDeleteModel, setDeleteConfirmation }) => {
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
      <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] p-4 text-center bg-white rounded-lg shadow dark:bg-[#1f0c35] sm:p-5 z-50">
        <button
          onClick={() => setDeleteModel(false)}
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
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
