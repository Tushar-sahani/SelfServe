import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#4C1A84] pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h1 className="w-full text-3xl font-bold text-white">
              Self<span className="text-[#d60b8c]">Serve</span>
            </h1>

            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="text-xl bg-white text-blue-500 hover:bg-gray-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 pl-3"
                type="button"
              >
                <FaTwitter />
              </button>
              <button
                className="text-xl bg-white text-blue-500 hover:bg-gray-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 pl-2"
                type="button"
              >
                <FaLinkedin />
              </button>
              <button
                className="text-xl bg-white hover:bg-gray-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 pl-2"
                type="button"
              >
                <FaGithub />
              </button>
              <button
                className="text-xl bg-white text-red-500 hover:bg-gray-200 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 pl-2"
                type="button"
              >
                <FaYoutube />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase  font-semibold mb-2 text-[#d60b8c]">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2"
                      to=""
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="/company"
                    >
                      Company
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase  font-semibold mb-2 text-[#d60b8c]">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="#"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="#"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="#"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-[#d60b8c] font-semibold block pb-2 "
                      to="#"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className=" py-1 text-white ">
              Copyright © <span>2024 </span>
              <Link to="https://in.rapipay.com/" className="font-bold">
                Rapi<span className="text-[#d60b8c]">Pay</span> Fintech Pvt.Ltd
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
