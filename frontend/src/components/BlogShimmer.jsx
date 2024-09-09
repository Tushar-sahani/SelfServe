import React from "react";

const BlogShimmer = () => {
  return (
    <div className="p-3 h-screen mt-20">
      <div className="max-w-7xl flex max-md:flex-col m-auto w-full gap-10 md:mt-10">
        <div class="flex items-center justify-center w-full h-60 md:w-[40rem] md:h-[35rem] bg-gray-300 rounded ">
          <svg
            class="w-10 h-10 bg-gray-300 text-gray-200 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        <div className="bg-white md:w-1/2">
          <div className="flex flex-col gap-7">
            <div className="border shadow rounded-md p-10 w-full mx-auto">
              {Array(5)
                .fill(null)
                .map(() => (
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-8 w-8 md:h-10 md:w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded w-20"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                        <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Popular section */}
      </div>
    </div>
  );
};

export default BlogShimmer;
