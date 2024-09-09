import React from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { handelModal } from "../redux/slices/handelLoginSlice";

const PostButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const handelPostButton=()=>{
    isAuthenticated?navigate('/newpost'):dispatch(handelModal(true))
  }
  return (
    <div className=" bg-[#4C1A84] border-2 p-4 rounded-full group cursor-pointer fixed md:right-10 right-5 md:bottom-10  bottom-5  box-border z-[50]" onClick={handelPostButton}>
      <FaPen className="group-hover:text-[#d60b8c] group-hover:scale-x-110 text-white md:text-3xl text-2xl" />
    </div>
  );
};

export default PostButton;
