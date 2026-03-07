import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(
        `/api/chats/${id}`,
        { message: input },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages([...messages, { text: input, from: "me" }]);
      setInput("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  const handleReply = (text) => {
    setInput(`@reply: ${text} `);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chats/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedMessages = res.data.map((msg) => ({
          text: msg.text,
          from: msg.sender_user_id === user.id ? "me" : "them",
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (isOpen) fetchMessages();
  }, [isOpen, id, token, user.id]);

  return (
    <>
      {/* Floating chat button */}
      <button className="chat-float-btn" onClick={toggleChat}>
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>💭 Chat</span>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet...</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${msg.from === "me" ? "me" : "them"}`}
                >
                  <div className="message-text">{msg.text}</div>
                  <button
                    className="reply-btn"
                    onClick={() => handleReply(msg.text)}
                  >
                    ↩ Reply
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
