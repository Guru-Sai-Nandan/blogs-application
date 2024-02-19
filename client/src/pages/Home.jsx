import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    fetchPost();
  }, [search]);

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      // console.log(res.data);
      if (res.data.length === 0) setNoResults(true);
      else setNoResults(false);
      setPosts(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-10 md:px-[190px] space-x-4">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts?.map((post, i) => {
            return (
              <div key={i}>
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <HomePosts key={post._id} post={post} />
                </Link>
              </div>
            );
          })
        ) : (
          <h2 className="text-center font-bold mt-16">
            No posts available based on your search
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
