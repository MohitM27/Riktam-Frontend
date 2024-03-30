import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const MessageList = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        if (response.status === 200) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Fetch messages error:", error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleLike = async (id) => {
    try {
      await axios.put(`/api/messages/${id}/like`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      // Redirect or show success message
    } catch (error) {
      console.error("Like message error:", error);
      // Handle error
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Row className="message" id="conversation">
      {messages.map((msg, i) => (
        <Row className="message-body" key={i + 1}>
          <Col sm={12} className={`message-main-${msg?.userMessage ? "sender" : "receiver"}`}>
            <div className={`${msg?.userMessage ? "sender" : "receiver"} h-auto`}>
              <div className="message-text">{msg?.text}</div>
              <i className={`fa ${msg?.liked ? "fa-thumbs-up text-warning":"fa-thumbs-o-up"} message-time`} aria-hidden="true" onClick={() => handleLike(msg?._id)} style={{ cursor: "pointer" }}></i>
              <span className="message-time">{msg?.createdAt}</span>
            </div>
          </Col>
        </Row>
      ))}
      <div ref={messagesEndRef} style={{ height: "0%" }} />
    </Row>
  );
};

export default MessageList;
