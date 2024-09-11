import React, { useEffect } from "react";
import useEditPostViewModel from "../viewModels/EditPostViewModel";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../components/ScrollToTop";
const EditPost = () => {
  const {
    title,
    description,
    tags,
    content,
    coverImage,
    loading,
    previewCoverImage,
    setPreviewCoverImage,
    handleTitleChange,
    handleDescriptionChange,
    handleContentChange,
    handleContentFileChange,
    handleRemoveCover,
    updatePost,
    handleAddSkill,
    handleRemoveSkill,
  } = useEditPostViewModel();

  const navigate = useNavigate();

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
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  //   useEffect(() => {
  //     // Fetch the post details when the component mounts
  //     // This should be handled in the ViewModel
  //   }, [id]);

  return (
    <>
      <ScrollToTop />
      <div className="max-w-4xl mx-auto mt-2 bg-[#f0f0f0] rounded-lg mb-1">
        <div className="p-3">
          <div className="">
            {!coverImage && !previewCoverImage ? (
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
                  src={previewCoverImage!==null?previewCoverImage:coverImagePreview}
                  alt="Cover Preview"
                  className="ml-4 w- h-20 object-contain rounded-lg"
                />
                <label
                 onClick={()=>setPreviewCoverImage(null)}
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
                  onClick={()=>{handleRemoveCover();setPreviewCoverImage(null)}}
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
              placeholder={`Edit post title here...`}
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
                placeholder="Add Tags here"
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
      <div className="max-w-4xl mx-auto flex gap-10 mb-5">
        <button
          onClick={updatePost}
          className="px-4 py-2 w-52 text-white bg-purple-600 rounded-lg"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-white bg-[#ce3547e1] rounded-lg"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditPost;
