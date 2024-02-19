import React from "react";
import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className="flex w-full mt-8 space-x-5">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + p.photo} alt="blog pic" className="h-full w-full" />
      </div>
      <div className="w-[65%] flex flex-col">
        <h1 className="text-xl font-bold md: mb-2 mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm text-semibold text-gray-500 space-x-4 md:mb-4 ">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {/* <p className="text-sm md:text-lg ">{p.description}</p> */}
        <div
          dangerouslySetInnerHTML={{
            __html: p.description.slice(0, 450) + "... Read More",
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePosts;
