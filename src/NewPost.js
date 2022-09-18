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
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={"/"}>Back to home</Link>
    </div>
  );
};

export default NewPost;
