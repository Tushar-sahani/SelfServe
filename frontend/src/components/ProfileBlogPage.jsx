import React, { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useShortNumber } from "../hooks/useShortNumber";
import { BiSolidLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import useFormate from "../hooks/useFormate";
import { Modal } from "../views/ProfilePage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProfileBlogPage = ({ blogs, isAuthenticated, token, setBlogs }) => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [error, setError] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteConfirmation && deletedId !== null) {
      const deleteBlog = async () => {
        try {
          const response = await axios.delete(
            `http://${import.meta.env.VITE_IP_ADDRESS}:${
              import.meta.env.VITE_PORT
            }/api/blog/deleteBlog/${deletedId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.apiResponseCode === "200") {
            if (response.data.apiResponseData.responseCode === "200") {
              setBlogs((prevBlogs) =>
                prevBlogs.filter((blog) => blog.id !== deletedId)
              );
              setDeletedId(null);
              toast.success("Blog deleted successfully!", { autoClose: 1500 });
            } else {
              setError(response.data.apiResponseData.responseMessage);
            }
          } else {
            setError(response.data.apiResponseMessage);
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to delete blog";
          setError(errorMessage);
        } finally {
          setDeleteConfirmation(false);
        }
      };

      deleteBlog();
    }
  }, [deleteConfirmation]);

  const toggleDropdown = (blogId) => {
    // Toggle dropdown visibility: open the clicked dropdown, close others
    setOpenDropdownId((prevId) => (prevId === blogId ? null : blogId));
  };

  return (
    <>
      {deleteModel && (
        <Modal
          setDeleteModel={setDeleteModel}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      <div className="mt-5">
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <CiImageOn className="text-7xl m-auto" />
              <h1 className="mt-4 text-2xl font-semibold text-gray-700">
                No Blogs Yet
              </h1>
              <p className="mt-2 text-gray-500">
                When you share blogs, they will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center max-md:p-2 mb-7">
            {blogs.map((data) => (
              <div
                key={data.id}
                className="relative bg-white shadow-md text-black rounded-sm p-6 mb-4 lg:w-[45vw] m-auto break-words w-full"
              >
                <Link to={`/blog/${data.id}`}>
                  <div className="flex items-center md:w-10/12">
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
                        <span>{useFormate(data.createdAtDate)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {isAuthenticated && (
                  <>
                    <div className="flex md:hidden justify-end px-4 pt-4">
                      <button
                        onClick={() => toggleDropdown(data.id)}
                        className="inline-block text-gray-500 absolute -right-2 top-5 focus:outline-none rounded-lg text-sm p-1.5"
                        type="button"
                      >
                        <BsThreeDotsVertical className="text-2xl" />
                      </button>
                      <div
                        className={`z-10 ${openDropdownId === data.id ? "block" : "hidden"} text-base absolute top-12 right-0 flex flex-col list-none bg-white p-3 divide-y divide-gray-100 rounded-lg shadow w-44`}
                      >
                        <button
                          className="text-[#4C1A84] md:text-3xl"
                          onClick={() => navigate(`/edit/${'blog'}/${data.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 md:text-3xl"
                          onClick={() => {
                            setDeletedId(data.id);
                            setDeleteModel(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex max-md:hidden md:gap-5 gap-4 absolute right-4 top-3 md:top-7 md:right-2 z-50 mt-5 md:mt-0">
                      <button
                        className="text-[#4C1A84] md:text-3xl"
                        onClick={() => navigate(`/edit/${'blog'}/${data.id}`)}
                      >
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
                  </>
                )}

                <div className="md:ml-16 p-2 border-b">
                  <p className="text-gray-700 max-md:hidden mb-4">
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
    </>
  );
};

export default ProfileBlogPage;
