import React, { useEffect, useState } from "react";
import { recentpost, mostfollowed } from "../utils/SidebarData";
import RecentPost from "../components/RecentPost";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handelModal } from "../redux/slices/handelLoginSlice";
import filterContentModel from "../model/filterContentModel";

const Sidebar = () => {
  // const [todaysPost, setTodaysPost] = useState([]);
  // const [topOfWeek, setTopOfWeek] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handelPostButton = () => {
    isAuthenticated ? navigate("/new/post") : dispatch(handelModal(true));
  };

  //Optamise way of handeling the api calls this will avoid the rerendering <<<< use later

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const data = await filterContentModel("Past24HoursPost");
  //       // Update state with fetched data
  //       setTodaysPost(data.posts); 
  //     } catch (err) {
  //       // Handle any errors
  //       ////console.log(err.message);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const { posts: todaysPost } = filterContentModel("Past24HoursPost",0,5);

 ////console.log("today",todaysPost);
 
  const { posts: topOfWeek } = filterContentModel("WeekPosts",0,5);
  // setTopOfWeek(todaypost);
  return (
    <div className=" md:w-1/3 xl:w-1/4 p-4 md:mt-8 ">
      {/* Post Button */}
      <button
        className="w-full bg-[#4C1A84] hover:bg-[#d60b8c] duration-200 text-white py-2 rounded mb-5 font-bold"
        onClick={handelPostButton}
      >
        Post
      </button>

      {/* Highest Followed Section */}

      <div className="mb-8 p-5 bg-white">
        <h2 className="text-lg text-[#d60b8c] mb-4">Most Followed</h2>
        {mostfollowed.map((person, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={person.imgSrc}
              alt={person.name}
              className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            />
            <div>
              <p className="font-semibold hover:text-[#d60b8c] cursor-pointer">
                {person.name}
              </p>
              <p className="text-sm text-gray-500">{person.role}</p>
              <p className="text-sm text-gray-500">
                Followers: {person.followers}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Todays Post */}
      <div className="mb-8 p-5 bg-white">
        <h2 className="text-lg text-[#d60b8c] mb-4">Today's Posts</h2>
        {todaysPost?.content?.length > 0 ? (
          todaysPost?.content?.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <RecentPost post={post} index={index} />
            </Link>
          ))
        ) : (
          <h1>Create Today's first Post!</h1>
        )}
      </div>

      {/* Top week */}
      <div className="mb-6 bg-white p-5">
        <h2 className="text-[#d60b8c] text-lg mb-4">Top of the week</h2>
        {topOfWeek?.content?.length > 0 ? (
          topOfWeek?.content?.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <RecentPost post={post} key={index} index={index} />
            </Link>
          ))
        ) : (
          <h1>No post Yet!</h1>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
