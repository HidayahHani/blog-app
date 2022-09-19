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
        if (data.message === "Resource not found") {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        setPost(data);
        setUserId(data.user_id);
        setTitle(data.title);
        setBody(data.body);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("There is an error");
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
      <>
        <div>
          <h1 className="text-center sm:text-xl md:text-2xl lg:text-3xl font-bold pt-16">
            Edit Post
          </h1>
        </div>

        <div className="flex justify-center items-center">
          <form className="bg-pink-100 sm:w-48 md:w-60 lg:w-72 border border-pink-500 shadow-md rounded px-10 pt-6 pb-8 mb-4">
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
            <br />
            <button
              className="bg-pink-400 px-4 py-2 text-white rounded-md"
              onClick={handleEditPost}
            >
              Update
            </button>
          </form>
        </div>
      </>
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
          <button className="bg-pink-400 px-4 py-2 text-white rounded-md absolute top-0 right-0 mt-6 mr-4">
            <Link to={"/"}>Back to home</Link>
          </button>
          {isEdit ? (
            renderUpdateForm()
          ) : (
            <>
              <h3 className="text-center sm:text-base md:text-2xl lg:text-4xl font-bold pt-16">
                {post.title}
              </h3>
              <br />
              <div className="text-center sm:text-base md:text-lg lg:text-xl">
                {post.body}
              </div>
              <br />
            </>
          )}

          {!isEdit && !isError && (
            <>
              <div className="flex justify-center items-center space-x-2">
                <button
                  className="bg-pink-400 px-4 py-2 text-white rounded-md"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-pink-400 px-4 py-2 text-white rounded-md"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
