import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getPosts = () => {
    return fetch("https://gorest.co.in/public/v2/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 7391c7ffc10a622a2f198e4edc177792cba250ccfdda8a4dfb0e60208eb6e512",
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response.status === 500) {
          setErrorMessage(
            "Internal server error. This could be caused by internal program errors."
          );
        } else if (err.response.status === 401) {
          setErrorMessage("Authentication failed.");
        } else if (err.response.status === 400) {
          setErrorMessage(
            "Bad request. This could be caused by various actions by the user, such as providing invalid JSON data in the request body etc."
          );
        }
      });
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1 className="text-center font-sans text-2xl md:text-4xl lg:text-6xl font-extrabold">
        All Posts
      </h1>
      <Link to={"/newpost"}>
        <button className="bg-pink-400 px-4 py-2 text-white rounded-md absolute top-0 right-0 mt-6 mr-4">
          Write a new post
        </button>
      </Link>
      <br />
      <br />
      {posts.map((post) => {
        return (
          <div className="border border-pink-200 text-lg bg-pink-100 mb-5 shadow-inner">
            <Link to={`/${post.id}`}>
              <div className="text-base md:text-lg lg:text-2xl font-bold underline">
                {post.title}
              </div>
            </Link>
            <div className="text-sm md:text-base lg:text-xl">{post.body}</div>
            <div className="text-sm md:text-base lg:text-xl font-bold">
              Authored by user id {post.user_id}{" "}
            </div>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
};

export default Posts;
