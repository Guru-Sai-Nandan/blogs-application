import axios from "axios";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Comment = ({ c, fetchPostComments }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      toast.success("Comment deleted successfully!");
      fetchPostComments();
    } catch (err) {
      console.log(err, "delete comment error");
    }
  };
  return (
    <div className="px-3 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 font-semibold tracking-wide">
          @{c.author}
        </h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <p>{new Date(c.updatedAt).toLocaleDateString()}</p>
          <p>{new Date(c.updatedAt).toLocaleTimeString()}</p>
          {user?._id === c?.userId && (
            <div className="flex items-center space-x-2">
              <p
                className="cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete className="text-xl md:text-2xl" />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2 font-medium text-black text-sm md:text-md tracking-wider">
        {c.comment}
      </p>
    </div>
  );
};

export default Comment;
