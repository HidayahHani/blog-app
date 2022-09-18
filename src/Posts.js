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
      <Link to={"/newpost"}>
        <button>Write a new post</button>
      </Link>
      {posts.map((post) => {
        return (
          <div>
            <Link to={`/${post.id}`}>{post.title}</Link>
            <div>{post.body}</div>
            <div>Authored by user id {post.user_id} </div>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
};

export default Posts;
