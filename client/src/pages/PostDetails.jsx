import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { IF, URL } from "../url";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data, "ddd");
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (err) {
      console.log(err, "fetch post comments error");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      toast.success("Post deleted successfully!");
      // console.log(res.data, 'deletedddd')
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      toast.success("Comment added successfully!");
      setComment("");
      fetchPostComments();
      // window.location.reload(true);
    } catch (err) {
      console.log(err, "comments err");
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-[200px] mt-8 mb-36">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl mb-4 md:mb-0">
              {post.title}
            </h1>
            {user && user._id === post.userId && (
              <div className="flex items-center justify-center space-x-4">
                <p
                  className="cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit className="text-2xl md:text-3xl lg:text-3xl text-blue-500 hover:text-blue-600 shadow-md" />
                </p>
                <p
                  className="cursor-pointer transition-transform transform hover:scale-110"
                  onClick={handleDeletePost}
                >
                  <MdDelete className="text-2xl md:text-3xl lg:text-3xl text-red-500 hover:text-red-600 shadow-md" />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p className="md:tracking-wider text-md">@{post.username}</p>
            <div className="flex space-x-2">
              <p className="md:tracking-wider text-md">
                {new Date(post.updatedAt).toString().slice(0, 15)}
              </p>
              <p className="md:tracking-wider text-md">
                {new Date(post.updatedAt).toString().slice(16, 24)}
              </p>
            </div>
          </div>

          <img
            src={IF + post.photo}
            className="w-full mx-auto mt-6 md:mt-8 max-h-[500px] object-cover"
            alt="pic"
          />

          <div className="text-gray-700 mt-6 md:mt-8 text-lg leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </div>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="px-3 py-1 bg-gray-300 rounded-lg">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">
              Comments: {comments?.length}
            </h3>
            {/* comments */}
            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                fetchPostComments={fetchPostComments}
              />
            ))}
          </div>

          {/* writing a comment */}
          <div className="flex flex-col mt-4 md:flex-row items-center my-5">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="w-full outline-none px-4 mt-4 md:mt-0 md:w-[80%] text-gray-800 border-b-2 border-gray-300 focus:border-black"
              type="text"
              placeholder="Write a comment"
            />
            <button
              onClick={postComment}
              className="bg-gray-600 text-sm rouded-md text-white px-4 py-2 mb-1 md:w-[17%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;