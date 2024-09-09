import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-col gap-7">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="border shadow rounded-md md:p-10 p-5 w-full md:w-3/4 lg:w-10/12 xl:w-9/12 mx-auto"
          >
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-300 h-10 w-10 md:h-16 md:w-16"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded w-20"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
                <hr />
                <div className="flex gap-4">
                  <div className="h-2 bg-gray-300 rounded w-12"></div>
                  <div className="h-2 bg-gray-300 rounded w-12"></div>
                  <div className="h-2 bg-gray-300 rounded w-12"></div>
                  <div className="h-2 bg-gray-300 rounded md:w-12"></div>
                  <div className="h-2 bg-gray-300 rounded md:w-12"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
