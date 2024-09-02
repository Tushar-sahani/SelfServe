// src/viewmodels/CreatePostViewModel.js
import { useState } from "react";

const useCreatePostViewModel = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [description,setDescription] = useState("");
 
  const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleContentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContent(file);
      console.log(file);

      // setCoverImagePreview(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = (e) => {
    const value = e.target.value;
    console.log(e.key);
    const space = value.replace(/,\s*$/, "");

    if (space && !tags.includes(space)) {
      if (e.key === " " || e.key === "Enter") {
        setTags([...tags, space]);
        e.target.value = "";
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTags(tags.filter((skill) => skill !== skillToRemove));
  };

  const publishPost = () => {
    // Logic to handle publishing the post
    console.log("Publishing post:", { title, tags, content });
  };

  return {
    title,
    description,
    tags,
    content,
    handleTitleChange,
    handleContentChange,
    publishPost,
    handleAddSkill,
    handleRemoveSkill,
    handleDescriptionChange
  };
};

export default useCreatePostViewModel;
