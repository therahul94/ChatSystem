import React, { useMemo, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setmessageList] = useState([]);

  const sendMessage = async () => {
    const messageobj = {
      message: currentMessage,
      room: room,
      author: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageobj);
    setmessageList((item) => [...item, messageobj]);
    setcurrentMessage("");
  };

  useMemo(() => {
    socket.on("receive_message", (data) => {
      setmessageList((item) => [...item, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {messageList?.map((item) => {
          return (
            <div
              className="message"
              id={username === item?.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{item?.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{item?.time}</p>
                  <p id="author">{item?.author}</p>
                </div>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <div>
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => setcurrentMessage(e.target.value)}
          />
        </div>
        <div>
          <AiOutlineSend
            // style={{ display: "flex", justifyContent: "center" }}
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
