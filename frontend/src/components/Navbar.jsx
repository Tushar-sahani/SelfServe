import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { handelModal } from "../redux/slices/handelLoginSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
import { setCredentials, setToken } from "../redux/slices/authSlice";

const Navbar = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("userId at frontend : ");
        const userId = Cookies.get("token"); // Adjust the cookie name as needed

        // console.log("userId at frontend : ", userId);
        if (!userId) {
          throw new Error("No user ID found in cookies");
        }

        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/users/${userId}`,
          { withCredentials: true } // Ensure cookies are sent with the request
        );
        // setData(response.data);
        dispatch(setCredentials(data.apiResponseData.responseData));
        dispatch(setToken(data.apiResponseData.token));
      } catch (err) {
        // console.log("error : ", err);
      }
    };

    fetchData();
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginOpen = useSelector((state) => state.loginModal.isOpen);

  document.body.style.overflow = isLoginOpen || isNavOpen ? "hidden" : "auto";

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLoginClick = () => {
    dispatch(handelModal(true));
    setIsNavOpen(false);
  };

  const handleCloseModal = () => {
    dispatch(handelModal(false));
  };

  const handleProfileModal = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const { isAuthenticated, userInfo } = useSelector((store) => store.auth);

  const handleLogout = () => {
    toast.success("Logged out successfully!  Redirecting to Landing page...", {
      autoClose: 2000,
    });
    setTimeout(() => {
      dispatch(logout());
      setIsProfileOpen(false);
      navigate("");
    }, 2000);
  };

  const navItems = [
    { id: 1, text: "Home", path: "" },
    { id: 2, text: "Blog", path: "/blog" },
    { id: 3, text: "About", path: "/about" },
    { id: 4, text: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="bg-[#4C1A84] sticky top-0 h-24 max-md:flex max-md:justify-evenly max-md:items-center max-w-full mx-auto px-4 text-white z-[999]">
        <div className="flex gap-32 justify-around items-center align-middle md:pt-7">
          <h1 className="text-3xl font-bold text-white cursor-pointer" onClick={()=>navigate("")}>
            Self<span className="text-[#d60b8c]">Serve</span>
          </h1>
          <div className="flex gap-8">
            <ul className="hidden md:flex lg:gap-8 xl:gap-12 md:gap-5 m-auto relative">
              {navItems.map((item) => (
                <Link to={item.path} key={item.id} className="m-auto" onClick={()=>setIsProfileOpen(false)}>
                  <li className="hover:text-[#d60b8c] text-xl cursor-pointer after:content-[''] after:block after:h-1 after:w-full after:bg-[#d60b8c] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-linear hover:after:scale-x-100">
                    {item.text}
                  </li>
                </Link>
              ))}

              <li className="relative">
                {isAuthenticated ? (
                  <div className="-mt-3 border border-[#d60b8c] rounded-full">
                    <img
                      src={userInfo.profileImage}
                      alt="profile"
                      className="w-14 h-14 m-auto rounded-full cursor-pointer"
                      onClick={handleProfileModal}
                    />
                  </div>
                ) : (
                  <li
                    className={`hover:text-[#d60b8c] ${
                      isAuthenticated && "hidden"
                    } text-xl cursor-pointer after:content-[''] after:block after:h-1 after:w-full after:bg-[#d60b8c] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-linear hover:after:scale-x-100`}
                    onClick={handleLoginClick}
                  >
                    Login
                  </li>
                )}

                {isProfileOpen && (
                  <div className="absolute right-0 m-1 backdrop-blur-sm bg-[#ffffffc2] w-80 text-center rounded-2xl">
                    <div className="flex gap-5 p-4 border-b text-black">
                      <img
                        src={userInfo.profileImage}
                        alt=""
                        className="w-20 h-20 rounded-full"
                      />
                      <ul className="text-left">
                        <li className="text-xl">{userInfo.name}</li>
                        <li className="text-md">{userInfo.email}</li>
                        <Link to={`/profile/${userInfo.id}`}>
                          <li
                            className="text-md pt-1 hover:text-[#d60b8c] underline hover:underline decoration-[#4C1A84]"
                            onClick={handleProfileModal}
                          >
                            View Profile
                          </li>
                        </Link>
                      </ul>
                    </div>
                    <button
                      className="m-4 text-xl text-center bg-red-500 p-1 w-28 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <Login isOpen={isLoginOpen} onClose={handleCloseModal} />

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden">
          {isNavOpen ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={`absolute text-xl text-center md:hidden left-0 w-full top-24 bg-[#3a1267] border-r border-r-gray-900 transition-all duration-300 z-[999] ${
            isNavOpen ? "h-screen opacity-100" : "h-0 opacity-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          {navItems.map((item) => (
            <Link to={item.path} key={item.id}>
              <li
                className="p-4 border-b rounded-xl delay-150 duration-300 hover:text-black cursor-pointer border-gray-600"
                onClick={handleNav}
              >
                {item.text}
              </li>
            </Link>
          ))}
          <li className="relative m-4">
            {isAuthenticated ? (
              <span
                className="block w-full hover:text-black cursor-pointer"
                onClick={handleProfileModal}
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
                <div className="flex flex-wrap gap-2 justify-center p-4 border-b text-black">
                  <img
                    src={userInfo.profileImage}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <ul className="text-left max-sm:text-center">
                    <li className="text-xl">{userInfo.name}</li>
                    <li className="text-md">{userInfo.email}</li>
                    <Link>
                      <li className="text-md pt-1">View Profile</li>
                    </Link>
                  </ul>
                </div>
                <button
                  className="md:m-4 m-3 text-xl text-center bg-red-500 p-1 w-32 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
