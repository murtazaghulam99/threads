import moment from "moment";
import { useEffect, useState } from "react";

const Thread = ({
  user,
  filteredThread,
  setOpenPopUp,
  getThreads,
  setInteractingThread,
}) => {
  const [replyLength, setReplyLength] = useState(null);

  const timePassed = moment().startOf("day").fromNow(filteredThread.timestamp);

  const handleClick = () => {
    setOpenPopUp(true);
    setInteractingThread(filteredThread);
  };

  const postLike = async () => {
    const hasBeenLikedByUser = filteredThread.likes.some(
      (like) => like.user_uuid === user.user_uuid
    );

    if (!hasBeenLikedByUser) {
      filteredThread.likes.push({
        user_uuid: user.user_uuid,
      });

      try {
        const response = await fetch(
          `http://localhost:3000/threads/${filteredThread.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filteredThread),
          }
        );
        const result = await response.json();
        console.log("Success", result);
        getThreads();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getRepliesLength = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${filteredThread?.id}`
      );
      const data = await response.json();
      setReplyLength(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepliesLength();
  }, [filteredThread]);

  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user.handle}</strong>
            </p>
            <p>{filteredThread.text}</p>
          </div>
        </div>
        <p>{timePassed}</p>
      </div>
      <div className="icons">
        <svg
          onClick={postLike}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
        </svg>
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 3.13 1.816 5.916 4.641 7.699.867 2.167-1.084 4.008-3.143 4.502 3.085.266 6.776-.481 9.374-2.497 7.08.54 13.128-3.988 13.128-9.704 0-5.384-5.373-9.747-12-9.747z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
        </svg>
      </div>
      <p>
        <span onClick={handleClick}>{replyLength} replies</span> •{" "}
        <span>{filteredThread.likes.length} likes</span>
      </p>
    </article>
  );
};

export default Thread;
