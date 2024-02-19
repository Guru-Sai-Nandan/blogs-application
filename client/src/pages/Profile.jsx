import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const param = useParams().id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, password, email },
        { withCredentials: true }
      );
      toast.success("User updated successfully!");
      // console.log(res.data, "user update");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="px-2 md:px-[200px] mt-8 flex flex-col-reverse md:flex-row items-start mb-[23vh]">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Posts</h1>
          {posts?.length === 0 && (
            <h2 className="text-md text-gray-600">No posts available</h2>
          )}
          {posts?.map((p) => (
            <Link to={user ? `/posts/post/${p._id}` : "/login"}>
              <ProfilePosts p={p} key={p._id} />
            </Link>
          ))}
        </div>
        <div className="md:sticky md:top-12 flex flex-col md:justify-end items-start ml-5 md:ml-0 md:items-end md:w-[30%] w-full">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500 w-full md:w-[80%] border-b-2 border-gray-300 focus:border-black transition duration-300"
              type="text"
              placeholder="Your username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500 w-full md:w-[80%] border-b-2 border-gray-300 focus:border-black transition duration-300"
              type="email"
              placeholder="Your email"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
