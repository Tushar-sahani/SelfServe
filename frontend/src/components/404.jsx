import React from "react";

const NotFound = () => {
  return (
    <div class="h-screen bg-gray-50 flex items-center">
      <div class="flex flex-col md:flex-row items-center justify-between lg:px-32 text-gray-700">
        <div class="w-full lg:w-1/2 mx-8">
          <div className="flex gap-10 items-center mb-8 flex-col lg:flex-row">
            <div class="text-7xl text-[#4C1A84] font-dark font-extrabold">
              404
            </div>
            <span className="text-4xl max-md:text-3xl font-bold">PAGE NOT FOUND</span>
          </div>

          <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldn't find the page you're looking for
          </p>

          <a
            href="/"
            class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#4C1A84] active:bg-[#d60b8c] hover:bg-[#d60b8c]"
          >
            back to homepage
          </a>
        </div>
        <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            class=""
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
