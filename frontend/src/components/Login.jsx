import React, { useState, useEffect } from "react";
import outlook from "../assets/outlook.png"

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        onClick={() => onClose(false)}
        className="bg-[#000000af] w-screen h-screen fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[102]"
      ></div>
      <div
        className={`md:w-[33rem]  duration-300 ease-linear w-[90%] mt-12 m-auto rounded-xl bg-white md:p-20 p-8 flex flex-col justify-center z-[104] fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]`}
      >
        <h2 className="text-3xl font-semibold text-black mb-10 text-center">
          Login
        </h2>
        <form className="space-y-6 p-5">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#d60b8c] hover:bg-[#2e0d54] duration-200 text-white py-3 px-8 my-5 rounded-lg font-semibold"
            >
              Login
            </button>
          </div>

          <div className="text-center after:content-['']  after:w-2/3 after:m-auto after:h-0.5 after:bg-[#00000041] after:block after:-mt-3">
            <p className="inline-block bg-white w-20 m-auto text-black">or</p>
          </div>

          <button
            type="button"
            class="text-gray-900 w-full bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-5 justify-center items-center me-2 mb-2"
          >
            <img src={outlook} alt="outlook" className="w-10" />
            Login with Outlook
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
