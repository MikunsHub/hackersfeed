"use client";
import { useState } from "react";
import Image from "next/image";
import glitch from "../../../public/assets/icons/glitch.jpeg";
import bell from "../../../public/assets/icons/bell-icon.svg";
import chat_icon from "../../../public/assets/icons/chat-icon.svg";
import arrow_icon from "../../../public/assets/icons/arrow-icon.svg";
import reply_icon from "../../../public/assets/icons/reply-icon.svg";
import close_icon from "../../../public/assets/icons/close-icon.svg";
import link_icon from "../../../public/assets/icons/link-icon.svg";
import { formatDate } from "../utilities/helpers";
import { generateRandomBy } from "../utilities/helpers";

const renderComments = (
  comments,
  activeReplyCommentId,
  setActiveReplyCommentId,
  handleCommentSubmit
) => {
  return (
    <ul className="ml-6 space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <img
                src={arrow_icon.src}
                alt="Arrow Icon"
                className="w-6 h-6 mt-1 cursor-pointer"
              />
              <p className="text-gray-800 font-semibold ml-2">{comment.by}</p>
            </div>
            <img
              src={
                activeReplyCommentId === comment.id
                  ? close_icon.src
                  : reply_icon.src
              }
              alt={
                activeReplyCommentId === comment.id
                  ? "Close Icon"
                  : "Reply Icon"
              }
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                if (activeReplyCommentId === comment.id) {
                  setActiveReplyCommentId(null); // Close the reply input
                } else {
                  setActiveReplyCommentId(comment.id); // Set active reply comment on click
                }
              }}
            />
          </div>
          <div className="pl-8">
            <p className="text-sm text-gray-600">{comment.text}</p>
          </div>
          {comment.child_comments && (
            <div className="ml-10 mt-2">
              <hr className="border-t border-gray-300" />
              {renderComments(
                comment.child_comments,
                activeReplyCommentId,
                setActiveReplyCommentId,
                handleCommentSubmit // Pass the function down to child comments
              )}
            </div>
          )}
          {activeReplyCommentId === comment.id && (
            <div className="ml-10 mt-2">
              <input
                type="text"
                placeholder="Write a reply..."
                className="border rounded px-2 py-1 w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCommentSubmit(comment.id); // Submit the reply
                  }
                }}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const DetailView = ({ article }) => {
  console.log("article=", article);
  const hasComments = article.comments && article.comments.length > 0;
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);

  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async (parentCommentId = null) => {
    // Prepare the comment data based on whether it's a reply or a new comment
    const commentData = {
      by: generateRandomBy(), // Replace with actual user data
      text: commentText,
    };

    if (parentCommentId !== null) {
      commentData.parent_comment = parentCommentId;
    }

    // API call to post the comment
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/news/${article.id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        // Comment posted successfully, refresh the page or update comments data
        // You might need to handle this based on your application's flow
        console.log("Comment posted successfully");
      } else {
        console.error("Error posting comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center w-full  ">
        <div>
          <p className="text-sm font-light text-green-500">
            {" "}
            {article.item_type}
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-bold ">{article.title}</h1>
        </div>

        <div className="flex gap-5 my-5">
          <div className="text-sm  font-bold">{article.by}</div>
          {/* <div className="text-sm  font-light">@authors mail</div> */}
          <h1 className="text-sm text-gray-400 font-bold">
            {formatDate(article.time)}
          </h1>
          {article.url ? (
            <a
              href={article.url}
              className="text-sm text-gray-400 font-bold flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to article
              <img
                src={link_icon.src}
                alt="Link Icon"
                className="w-4 h-4 mr-1"
              />{" "}
              {/* Icon */}
            </a>
          ) : null}
        </div>

        <div>
          <Image src={glitch} width={500} height={500} className="" />
        </div>

        <div className="my-5">
          <h1 className="text-[15px] font-light">{article.text}</h1>
        </div>
        <div className="mb-6">
          <div>
            <h1 className="text-2xl font-bold">Conversation</h1>
          </div>
          <div className="border border-1-gray-500 my-4"></div>
          <div>
            <h3 className="text-sm font-light">
              Welcome to HackersFeed comments section, Please keep conversations
              respectful and on topic. See our guidelines for more information.
            </h3>
          </div>
          <div className="mt-4">
            <div className="my-3">
              <div className="search-btn flex flex-col items-end mb-7">
                <div className="flex items-center mb-2">
                  <img
                    src={bell.src}
                    alt="Bell Icon"
                    className="w-5 h-5 inline-block mr-2"
                  />
                  <p className="text-gray-400 text-sm">Log in</p>
                </div>
                <input
                  type="text"
                  placeholder="Make a comment"
                  className="block w-full p-2 border rounded"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (activeReplyCommentId !== null) {
                        handleCommentSubmit(activeReplyCommentId);
                      } else {
                        handleCommentSubmit();
                      }
                      setCommentText(""); // Clear the input field after submission
                    }
                  }}
                />
              </div>

              <div className="text-center">
                {hasComments ? null : ( // No need to show the message if there are comments
                  <div className="mb-2">
                    <img
                      src={chat_icon.src}
                      alt="Chat Icon"
                      className="w-5 h-5 inline-block mx-auto mb-1"
                    />
                    <p className="text-gray-400 text-sm text-center">
                      No one seems to have shared their thoughts on this topic
                      yet. Leave a comment so your voice will be heard first.
                    </p>
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-lg">
                  {article.comments &&
                    renderComments(
                      article.comments,
                      activeReplyCommentId,
                      setActiveReplyCommentId,
                      handleCommentSubmit
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailView;
