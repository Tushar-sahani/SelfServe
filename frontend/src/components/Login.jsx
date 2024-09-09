import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import outlook from "../assets/outlook.png";
import { useDispatch } from "react-redux";
import { setCredentials, setToken } from "../redux/slices/authSlice";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.apiResponseCode === "200") {
        if (data.apiResponseData.responseCode === "200") {
          toast.success("Login successful!", {
            autoClose: 1000,
          });

          setTimeout(() => {
            dispatch(setCredentials(data.apiResponseData.responseData));
            dispatch(setToken(data.apiResponseData.token));
            onClose(!isOpen);
            // navigate("/");
          }, 1000);
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
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => onClose(false)}
        className="bg-[#000000af] w-screen h-screen fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[102]"
      ></div>
      <div
        className={`md:w-[33rem] duration-300 ease-linear w-[90%] mt-12 m-auto rounded-xl bg-white md:p-20 p-8 flex flex-col justify-center z-[104] fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]`}
      >
        <h2 className="text-3xl font-semibold text-black mb-10 text-center">
          Login
        </h2>
        <form className="space-y-6 p-5" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#d60b8c] hover:bg-[#2e0d54] duration-200 text-white py-3 px-8 my-5 rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="text-center after:content-['']  after:w-2/3 after:m-auto after:h-0.5 after:bg-[#00000041] after:block after:-mt-3">
            <p className="inline-block bg-white w-20 m-auto text-black">or</p>
          </div>

          <button
            type="button"
            className="text-gray-900 w-full bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-5 justify-center items-center me-2 mb-2"
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
