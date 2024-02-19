import React from "react";
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full mt-8 space-y-4 lg:space-y-0 lg:space-x-5">
      <div className="lg:w-[32%] h-52 lg:h-200 flex-shrink-0 relative">
        <img
          src={IF + post.photo}
          alt="blog pic"
          className="object-cover w-full h-full rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="lg:w-[65%] flex flex-col">
        <h1 className="text-xl font-bold md:text-2xl mb-2 lg:hover:text-blue-600 transition duration-300 ease-in-out">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm text-gray-500 space-x-4 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="summary text-md mb-4 lg:mb-0">
          <p
            dangerouslySetInnerHTML={{
              __html: post.description.slice(0, 450) + "... Read More",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
