import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useEditPostViewModel = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState(null);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.auth);

  const { id } = useParams();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/article/articleId/${id}`
        );
        const data = response.data;
    
        if (data.apiResponseCode === "200") {
          const post = data.apiResponseData.responseData;
          console.log("post",post);
          
          setTitle(post.title);
          setDescription(post.description);
          setContent(post.content);
          setTags(post.tagList || []);
          setPreviewCoverImage(post?.coverImage) 
        } else {
          toast.error(data.apiResponseMessage, { autoClose: 3000 });
        }
      } catch (error) {
        // console.error("Error fetching post:", error);
        toast.error("Failed to fetch post details.");
      }
    };

    fetchPost();
  }, [id, token]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleContentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleRemoveCover = () => {
    setCoverImage(null);
  };

  const handleAddSkill = (e) => {
    const value = e.target.value.trim();
    if (value && !tags.includes(value)) {
      if (e.key === " " || e.key === "Enter") {
        setTags([...tags, value]);
        e.target.value = "";
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTags(tags.filter((skill) => skill !== skillToRemove));
  };

  const updatePost = async () => {
    const datapost = {
      raw: {
        title,
        tagList: tags,
        description,
        content,
        user: userInfo,
      },
      postImage: coverImage,
    };

    
    try {
      setLoading(true);
      if (title.trim() === "") {
        toast.error("Title cannot be empty.", { autoClose: 2000 });
        return;
      } else if (description.length < 50 || description.length > 250) {
        toast.error("Description should be between 50 and 250 characters.", {
          autoClose: 2000,
        });
        return;
      } else if (tags.length < 2) {
        toast.error("At least two tags are required.", { autoClose: 2000 });
        return;
      }
      
      const response = await axios.patch(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/article/${id}`,
        datapost,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response);

      const data = response.data;
      if (data.apiResponseCode === "200") {
        if (data.apiResponseData.responseCode === "200") {
          toast.success(`Post updated successfully!`, {
            autoClose: 1800,
          });
          navigate(`/post/${id}`);
        } else {
          // Error at Spring Level
          const errorMessage = data.apiResponseData.responseMessage;
          toast.error(errorMessage, { autoClose: 3000 });
        }
      } else {
        // Error at node level
        const errorMessage = data.apiResponseMessage;
        toast.error(errorMessage, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useEditPostViewModel;
