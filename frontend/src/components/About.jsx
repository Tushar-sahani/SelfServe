import React from "react";
import aboutimg from "../assets/aboutimg.jpg";

const About = () => {
  return (
    <div className="mb-14">
      <div className="w-full box-border overflow-hidden flex flex-col md:flex-row lg:gap-20 lg:pl-20 bg-blue-50 align-middle justify-center h-[60vh] p-8 relative">
        <div className="flex flex-col gap-4 my-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center ">
            <span>Self</span>
            <span className="text-[#d60b8c]">Serve</span>
          </h1>
          <p className="text-lg">
            Empowering minds, enriching RapiPay where shared knowledge fuels
            innovation.
          </p>
        </div>

        <div>
          <div className="bg-white md:rounded-l-full md:h-[40rem] max-md:h-[60%] max-md:rounded-t-full w-full absolute md:-top-5 bottom-0 -ml-7"></div>
          <div className="flex justify-center md:justify-center">
            <img
              src={aboutimg}
              alt="logo"
              className="w-3/4 md:w-[34rem] md:ml-40 mx-auto max-w-sm md:max-w-xl h-auto rounded-lg rounded-t-3xl object-contain z-10"
            />
          </div>
        </div>
      </div>
      <div className="text-xl w-full md:w-2/3 m-auto mt-12 flex">
        <p className="mb-3 text-gray-500 tracking-widest first-letter:text-6xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-700 first-letter:me-1 first-letter:float-start drop-cap leading-8 mt-1 ml-2">
          SelfServe is a knowledge-sharing platform from RapiPay that empowers
          employees to share experiences, insights, and valuable knowledge. It’s
          a space where team members can post thoughts, ideas, and lessons
          learned, fostering a collaborative culture and driving innovation.
          SelfServe is more than just a platform; it’s a community where every
          contribution helps build a collective repository of knowledge,
          benefiting everyone at RapiPay and supporting continuous learning and
          growth.
        </p>
      </div>
    </div>
  );
};

export default About;
