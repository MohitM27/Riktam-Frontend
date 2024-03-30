import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        setShowError(false);
        window.location.href = "/";
      } else {
        setErrorMessage(response.data.message || "Login failed");
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "An error occurred during login"
      );
      setShowError(true);
    }
    setLoading(false);
  };

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>
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
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
