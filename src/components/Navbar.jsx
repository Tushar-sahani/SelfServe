import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Login from "./Login";
// import { useSelector } from "react-redux";
// import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.style.overflow = isNavOpen ? "hidden" : "auto";
  };
  document.body.style.overflow = isLoginOpen || isNavOpen ? "hidden" : "auto";

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsNavOpen(false);
  };

  const handleCloseModal = () => {
    setIsLoginOpen(false);
  };

  const handelProfileModal = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const isAuth = false;
  // const isAuth = useSelector((store)=>store.auth.isAuthenticated);

  const navItems = [
    { id: 1, text: "Home", path: "" },
    { id: 2, text: "Blog", path: "/blog" },
    { id: 3, text: "About", path: "/about" },
    { id: 4, text: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-[#4C1A84] sticky top-0 flex justify-evenly items-center h-24 max-w-full mx-auto px-4 text-white z-[999]">
      <h1 className="w-full text-3xl font-bold text-white">
        Self<span className="text-[#d60b8c]">Serve</span>
      </h1>
      <div className="flex gap-8">
        <ul className="hidden md:flex lg:gap-8 md:gap-5 m-auto relative">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index} className="m-auto">
              <li
                key={item.id}
                className=' hover:text-[#d60b8c] text-xl cursor-pointer after:content-[""] after:block after:h-1 after:w-full after:bg-[#d60b8c] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-linear hover:after:scale-x-100'
              >
                {item.text}
              </li>
            </Link>
          ))}

          <li className="relative ">
            {isAuth ? (
              <div className="w-16 border border-[#d60b8c] rounded-full">
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
                  alt="profile"
                  className="w-16 h-16 m-auto rounded-full cursor-pointer"
                  onClick={handelProfileModal}
                />
              </div>
            ) : (
              <li
                key={5}
                className={`hover:text-[#d60b8c] ${
                  isAuth && "hidden"
                } text-xl cursor-pointer after:content-[""] after:block after:h-1 after:w-full after:bg-[#d60b8c] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-linear hover:after:scale-x-100`}
                onClick={handleLoginClick}
              >
                Login
              </li>
            )}

            {isProfileOpen && (
              <div className="absolute right-0 m-1 backdrop-blur-sm bg-[#ffffffc2] w-80  text-center rounded-2xl">
                <div className="flex gap-5 p-4 border-b text-black">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
                    alt=""
                    srcset=""
                    className="w-20 h-20 rounded-full"
                  />
                  <ul className="text-left">
                    <li className="text-xl">Tushar Sahani</li>
                    <li className="text-md">tusharsahani@gmail.com</li>
                    <Link to="/profile">
                      <li
                        className="text-md pt-1 hover:text-[#d60b8c] underline hover:underline decoration-[#4C1A84]"
                        onClick={handelProfileModal}
                      >
                        View Profile
                      </li>
                    </Link>
                  </ul>
                </div>
                <button className="m-4 text-xl text-center bg-red-500 p-1 w-28 rounded-md">
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
      <Login isOpen={isLoginOpen} onClose={handleCloseModal} />

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {isNavOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`absolute text-xl text-center md:hidden left-0 w-full top-24 bg-[#3a1267] border-r border-r-gray-900 transition-all duration-300  z-[999] ${
          isNavOpen ? "h-screen opacity-100" : "h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        {navItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <li
              key={item.id}
              className="p-4 border-b rounded-xl delay-150 duration-300 hover:text-black cursor-pointer border-gray-600"
              onClick={handleNav}
            >
              {item.text}
            </li>
          </Link>
        ))}
        <li className="relative m-4">
          {isAuth ? (
            <span
              className="block w-full hover:text-black cursor-pointer"
              onClick={handelProfileModal}
            >
              Profile
            </span>
          ) : (
            <span
              className="block w-full hover:text-black cursor-pointer"
              onClick={handleLoginClick}
            >
              Login
            </span>
          )}
          {isProfileOpen && (
            <div
              className={`m-auto backdrop-blur-sm bg-[#ffffff9f] text-center rounded-2xl mt-5`}
            >
              <div className="flex flex-wrap mg:gap-10 gap-2 justify-center p-4 border-b text-black">
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
                  alt="profile"
                  className="w-20 h-20 rounded-full"
                />
                <ul className="text-left max-sm:text-center">
                  <li className="text-xl">Tushar Sahani</li>
                  <li className="text-md">tusharsahani@gmail.com</li>
                  <li className="text-md pt-1">View Profile</li>
                </ul>
              </div>
              <button className="md:m-4 m-3 text-xl text-center bg-red-500 p-1 w-32 rounded-md">
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
