import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

const CreateGroup = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [users, setUsers] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const response = await axios.get("/api/users", { headers });
        if (response.status === 200) {
          setUsers(response.data.map((el) => ({ label: el.username, value: el._id })));
          setShowError(false);
        } else {
          handleError("Something went wrong");
        }
      } catch (error) {
        handleError(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchUserData();
  }, []);

  const handleError = (message) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedOption.length || !name.length) {
        return handleError("All fields are required");
      }

      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.post(
        "/api/groups",
        { name, members: selectedOption.map((el) => el.value) },
        { headers }
      );

      if (response.status === 201) {
        setShowError(false);
        formRef.current.reset(); // Reset the form
        setName(""); // Reset name state
        setSelectedOption([]); // Reset selectedOption state
      } else {
        handleError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      handleError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Col sm={8} className="mt-5">
      {showError && (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      <Form ref={formRef} onSubmit={handleSubmit} className="col-sm-12">
        <Form.Group as={Row} controlId="groupName">
          <Form.Label column sm={3}>Group Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="users" className="mt-2">
          <Form.Label column sm={3}>Users:</Form.Label>
          <Col sm={9}>
            <Select
              isMulti
              name="users"
              options={users}
              value={selectedOption}
              onChange={handleChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </Col>
        </Form.Group>

        <Row className="mt-2">
          <Col sm={12} className="text-end">
            <Button type="submit" variant="primary">Create Group</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default CreateGroup;
