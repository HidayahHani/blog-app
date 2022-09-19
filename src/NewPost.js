import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewPost = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { userId, title, body };
    console.log(submitData);

    fetch("https://gorest.co.in/public/v2/posts/", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, title: title, body: body }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 7391c7ffc10a622a2f198e4edc177792cba250ccfdda8a4dfb0e60208eb6e512",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUserId("");
        setTitle("");
        setBody("");
        alert("Post has been successfully created!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div w-full max-w-xs>
      <h2 className="text-center sm:text-xl md:text-4xl lg:text-6xl font-bold pt-4">
        New Post
      </h2>
      <br />
      <div className="flex justify-center items-center">
        <form
          className="bg-pink-100 sm:w-48 md:w-60 lg:w-72 border border-pink-500 shadow-md rounded px-10 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <br />
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Body:</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <br />
          <button
            className="bg-pink-400 px-4 py-2 text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <br />
      <button className="bg-pink-400 px-4 py-2 text-white rounded-md absolute top-0 right-0 mt-6 mr-4">
        <Link to={"/"}>Back to home</Link>
      </button>
    </div>
  );
};

export default NewPost;
