import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return fetch("https://gorest.co.in/public/v2/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 7d80bd121f12428994b583e9b723e288e01546d4813687872ffb55b9bccbe31e",
      },
    });
  };

  useEffect(() => {
    getPosts()
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <div>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
};

export default Posts;
