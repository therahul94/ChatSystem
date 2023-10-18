import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
// import Button from "react-bootstrap/Button";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8000");
function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const [showchat, setshowchat] = useState(false);

  const joinRoom = () => {
    if (!username || !room) {
      return alert("please fill all the fields");
    }
    socket.emit("join_room", room);
    setshowchat(true);
  };
  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            value={username}
            placeholder="John..."
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="text"
            value={room}
            placeholder="Room ID..."
            onChange={(e) => setroom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
