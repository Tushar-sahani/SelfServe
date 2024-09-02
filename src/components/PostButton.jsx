import React from 'react'
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
const PostButton = () => {
  return (
    <Link to="new"><div className=' bg-[#4C1A84] border-2 p-4 rounded-full group cursor-pointer fixed md:right-10 right-5 md:bottom-10  bottom-5  box-border z-[50]'>
        <FaPen className='group-hover:text-[#d60b8c] group-hover:scale-x-110 text-white md:text-3xl text-2xl'/>
    </div></Link>
  )
}

export default PostButton