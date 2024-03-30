import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const SendMessage = ({ id }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text.trim() !== "") {
        await axios.post(`/api/messages/${id}`, { text: text.trim() }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        setText("");
      }
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <Row className="reply">
      <Col sm={11} xs={11} className="reply-main">
        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            rows="1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form>
      </Col>
      <Col sm={1} xs={1} className="reply-send">
        <Button variant="transparent" className="p-0" onClick={handleSubmit}>
          <i className="fa fa-send fa-2x" aria-hidden="true" style={{ cursor: "pointer" }}></i>
        </Button>
      </Col>
    </Row>
  );
};

export default SendMessage;
