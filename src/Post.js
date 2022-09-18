import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const getPost = () => {
    return fetch(`https://gorest.co.in/public/v2/posts/${postId}`, {
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
    getPost()
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setUserId(data.user_id);
        setTitle(data.title);
        setBody(data.body);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleUpdateTitle = (value) => {
    setTitle(value);
  };

  const handleUpdateBody = (value) => {
    setBody(value);
  };

  const renderUpdateForm = () => {
    return (
      <form>
        <label>User ID: </label>
        <input type="text" value={userId} readOnly />
        <br />
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleUpdateTitle(e.target.value)}
        />
        <br />
        <label>Body:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => handleUpdateBody(e.target.value)}
        />
        <br />
        <button onClick={handleEditPost}>Update</button>
      </form>
    );
  };

  const handleEditPost = () => {
    fetch(`https://gorest.co.in/public/v2/posts/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 7391c7ffc10a622a2f198e4edc177792cba250ccfdda8a4dfb0e60208eb6e512",
      },
      body: JSON.stringify({ title: title, body: body }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleDeletePost = () => {
    fetch(`https://gorest.co.in/public/v2/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 7391c7ffc10a622a2f198e4edc177792cba250ccfdda8a4dfb0e60208eb6e512",
      },
    }).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      {isError ? <div>Post not found</div> : null}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Link to={"/"}>Back to home</Link>
          {isEdit ? (
            renderUpdateForm()
          ) : (
            <>
              <h3>{post.title}</h3>
              <div>{post.body}</div>
            </>
          )}

          {!isEdit && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDeletePost}>Delete</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
