import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareForward2Fill } from "react-icons/ri";
import { PostData } from "../utils/PostData";
import RecentPost from "./RecentPost";
import Recommendation from "./Recommendation";
import CommentList from "../views/CommentList";
import useFormate from "../hooks/useFormate";

const PostDetail = () => {
  const data = PostData[0];

  return (
    <>
      <div className="flex justify-center bg-gray-100 py-8">
        {/* left side bar like comment etc */}

        <div className="relative md:w-20 z-50">
          <div className="fixed flex flex-col max-md:bottom-0 max-md:flex-row max-md:justify-evenly max-md:w-full max-md:bg-white">
            <button className="mb-4 p-2 max-md:flex gap-2">
              <AiOutlineHeart className="text-3xl" />
              <p className="text-sm max-md:text-xl max-md:m-auto">
                {data.statistics.likes}
              </p>
            </button>
            <button className="mb-4 p-2 max-md:flex gap-2">
              <IoChatbubbleEllipsesOutline className="text-3xl" />
              <p className="text-sm max-md:text-xl max-md:m-auto">
                {data.statistics.comments}
              </p>
            </button>
            <button className="mb-4 p-2  max-md:flex">
              <RiShareForward2Fill className="text-3xl" />
            </button>
          </div>
        </div>

        <div className="flex max-md:flex-wrap justify-center">
          {/* Middel Main content */}

          <div>
            <div className="max-w-4xl bg-white shadow-lg rounded-lg p-6 flex-grow">
              <img src={data.coverImg} alt="" className="w-full" />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={data.profileImg}
                    alt="User avatar"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {data.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Posted on {useFormate(data.postDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <h1 className="md:text-3xl text-xl font-bold text-gray-900">
                  {data.title}
                </h1>
                <div className="flex flex-wrap items-center space-x-1 md:space-x-2 mt-2">
                  {data.tags.map((tag, i) => (
                    <span key={i} className="sm:text-sm text-xs text-[#4c1886]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-gray-700">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
                  sunt eius culpa placeat illum nisi? Reiciendis, harum quas
                  porro cum sed accusantium dignissimos quos, nemo voluptates
                  eveniet officiis doloremque sunt unde amet hic laborum at
                  repellendus nam assumenda fuga, illo repellat. Veniam, quod?
                  Optio praesentium reiciendis nostrum asperiores distinctio
                  doloribus harum, quasi perferendis beatae architecto ratione
                  consequuntur illo hic, aperiam officia dolores iusto rem velit
                  facilis impedit omnis? Illum inventore atque laboriosam
                  repudiandae perferendis? Odio exercitationem qui accusamus
                  assumenda ex quas deserunt quibusdam fugiat tempore nemo
                  soluta unde placeat, corporis perspiciatis ea, aspernatur
                  vitae. Nam laudantium deserunt quibusdam velit, qui blanditiis
                  culpa dolor, ex veniam cumque repudiandae neque sit minus
                  rerum odio pariatur ullam alias a nihil illum similique est!
                  Ipsum culpa a, soluta alias vel atque inventore sint
                  necessitatibus eaque dolores eos repudiandae minima quos nam
                  accusantium, eum fugiat. Iste, doloremque! Aspernatur
                  recusandae necessitatibus aliquid ab incidunt ea assumenda,
                  magni tempore dicta quaerat, sapiente rerum debitis. Facilis
                  dolores ratione aperiam quia quae eaque accusantium nihil
                  consectetur, voluptatem corrupti autem velit et nulla repellat
                  reiciendis libero, doloremque iusto dolor laudantium natus
                  alias molestias reprehenderit? Alias dolore aliquam cumque
                  corrupti temporibus similique mollitia, molestias eos deleniti
                  modi sint fugit. Adipisci, animi! I'm honestly curious. I try
                  to use semantic HTML when possible, so if I use
                  &lt;section&gt; when it seems appropriate (when there's a
                  semantic section of content containing a heading at the
                  beginning). In general, semantic HTML helps with accessibility
                  and SEO, but I'm unsure if &lt;section&gt; has much if any
                  practical benefits, to be honest. I test with a screen reader
                  and it doesn't acknowledge it at all, which makes sense I
                  suppose, since it doesn't exactly have a meaning. So what is
                  the point of it? I'll probably still keep using it even if no
                  one can come up with anything since it just feels like a good
                  policy to be semantic, but I'd love to know if there are some
                  practical benefits.
                </p>
              </div>
              <div>
                <h1 className="text-xl font-semibold pt-5 pb-5">Top Comment</h1>
                <CommentList />
              </div>
            </div>
            <Recommendation />
          </div>

          {/* Right Side User Information and More Post */}
          <div className="md:ml-8 p-4 w-96 max-md:w-full">
            <div className="text-center bg-white relative">
              <div className="bg-[#d60b8c] w-full h-1 mt-10"></div>
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4 -mt-10"
                src={data.profileImg}
                alt="User avatar"
              />
              <h2 className="text-lg font-semibold text-gray-900">Talia</h2>
              <p className="text-sm text-gray-500">
                Front-End Web Developer at MPR News
              </p>
              <p className="text-sm text-gray-500">Florida, United States</p>

              <div className="pt-3">
                <button className="bg-[#4C1A84] w-4/5 p-1 text-white rounded-md">
                  Follow
                </button>
              </div>
              <p className="p-4 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, est? Lorem ipsum dolor lorem shife sit amet consectetur
                adipisicing elit. Minima, in.
              </p>
              <div className="text-left ml-12 pb-5">
                <div>
                  <h6 className="text-base">Location</h6>
                  <span className="text-sm text-gray-500">Sector 60 Nodia</span>
                </div>
                <div>
                  <h6 className="text-base">Experience</h6>
                  <span className="text-sm text-gray-500">3 Years</span>
                </div>
              </div>
            </div>
            <div className="bg-white mt-5 p-4 md:sticky md:top-28">
              <h3 className=" font-semibold mb-5">More from Talia</h3>
              <div className="">
                {PostData.slice(0, 4).map((post, index) => (
                  <RecentPost key={index} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
