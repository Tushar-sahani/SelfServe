import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useCreatePostViewModel = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState(null);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.auth);
  
  const {category} = useParams();
  

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
const handelRemoveCover =()=>{
  setCoverImage(null);
}
  const handleAddSkill = (e) => {
    const value = e.target.value.trim().toLowerCase();
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

  const publishPost = async () => {
    const datapost = {
      raw: {
        title: title,
        tagList: tags,
        description: description,
        content: content,
        user: userInfo,
      },
      postImage: coverImage,
    };

    try {
      setLoading(true);
      if (title.trim() === "") {
        toast.error("Title cannot be empty.", { duration: 2000 });
        return;
      } else if (description.length < 50 || description.length > 250) {
        toast.error("Description should be between 50 and 250 characters.", {
          duration: 2000,
        });
        return;
      } else if (tags.length < 2) {
        toast.error("At least two tags are required.", { duration: 2000 });
        return;
      }

      const response = await axios.post(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/article/post/${category}`,
        datapost,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.apiResponseCode === "200") {
        if (data.apiResponseData.responseCode === "200") {
          console.log("inside success<<<<<<<<",response);
          
          toast.success(`${category.charAt(0).toUpperCase()+category.slice(1,category.length)} published successfully!`, {
            duration: 1800,
          });
          navigate(`/${category}/${response.data.apiResponseData.responseData.id}`,{ replace: true });
        } else {
          // Error at Spring Level
          const errorMessage = data.apiResponseData.responseMessage;
          
          toast.error("Something went Wrong!", { duration: 3000 });
        }
      } else {
        // Error at node level
        const errorMessage = data.apiResponseMessage;

        toast.error("Something went Wrong", { duration: 3000 });
      }
    } catch (error) {
      toast.error("Failed to publish post. Please try again.");
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
    handleTitleChange,
    handleDescriptionChange,
    handleContentChange,
    handleContentFileChange,
    handelRemoveCover,
    publishPost,
    handleAddSkill,
    handleRemoveSkill,
  };
};

export default useCreatePostViewModel;
