import React from "react";
import useCreatePostViewModel from "../viewModels/CreatePostViewModel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const {
    title,
    description,
    tags,
    content,
    coverImage,
    handleTitleChange,
    handleDescriptionChange,
    handleContentChange,
    handleContentFileChange,
    publishPost,
    handleAddSkill,
    handleRemoveSkill,
  } = useCreatePostViewModel();

  const coverImagePreview = coverImage ? URL.createObjectURL(coverImage) : "";

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-2 bg-slate-200 rounded-lg mb-1">
        <div className="p-3">
          <div className="">
            {!coverImage ? (
              <label
                htmlFor="dropzone-file"
                className="flex bg-white flex-col w-52 ml-5 p-1 m-6 items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <span className="w-full text-center">Upload cover image</span>
                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleContentFileChange}
                  required
                />
              </label>
            ) : (
              <div className="flex gap-5">
                <img
                  src={coverImagePreview}
                  alt="Cover Preview"
                  className="ml-4 w- h-20 object-contain rounded-lg"
                />
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col w-16 p-2 my-auto h-10 rounded-md justify-center  cursor-pointer"
                >
                  <span className="w-full text-center text-blue-900 ">
                    Change
                  </span>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleContentFileChange}
                  />
                </label>
                <button
                  className="text-red-600 my-auto h-10"
                  onClick={() => setCoverImage(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="ml-5">
            <input
              required
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="New post title here..."
              className="w-full placeholder:text-[#434242] bg-transparent pt-2 mb-4 text-4xl font-bold placeholder:text-4xl text-gray-700 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              required
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Short Description..."
              className="w-full placeholder:text-[#434242] bg-transparent pt-2 mb-4 text-gray-700 border-gray-300 focus:outline-none"
            />
            <div className="flex flex-wrap rounded relative">
              {tags &&
                tags.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#022931] text-white p-1 mb-4 rounded m-1 flex items-center"
                  >
                    <p className="pl-1">{skill}</p>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-[#d60b8c] font-bold"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              <input
                required
                type="text"
                onKeyDown={handleAddSkill}
                className="bg-transparent placeholder:font-semibold placeholder:text-[#000000ab] p-1 outline-none flex-grow mb-3"
                placeholder="Add Up to 4 Tags"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 w-full">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
            modules={modules}
            placeholder="Write your post content here..."
            className="text-gray-700 outline-none"
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={publishPost}
          className="px-4 py-2 w-52 mx-auto text-white bg-purple-600 rounded-lg"
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default EditPost;
