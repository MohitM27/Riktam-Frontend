import React, { useState, useEffect } from "react";
import { Table, Button, Form, Alert, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "./list.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [formData, setFormData] = useState({ name: "", password: "", username: "" });
  const [alert, setAlert] = useState({ show: false, variant: "success", message: "" });

  const fetchUsers = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.get("/api/users", { headers });
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.post("/api/auth/register", formData, { headers });

      if (response.status === 201) {
        setAlert({ show: true, variant: "success", message: "User Created Successfully" });
        setFormData({ name: "", username: "", password: "" });
        fetchUsers();
      } else {
        setAlert({ show: true, variant: "danger", message: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setAlert({ show: true, variant: "danger", message });
    }
  };

  const handleDelete = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.delete("/api/users/" + id, { headers });

      if (response.status === 204) {
        setAlert({ show: true, variant: "success", message: "User Deleted Successfully" });
        fetchUsers();
      } else {
        setAlert({ show: true, variant: "danger", message: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setAlert({ show: true, variant: "danger", message });
    }
  };

  const handleEdit = async (el) => {
    setEditUser(el);
    setFormData({ name: el.name, password: "", username: el.username });
    setAddUser(false);
  };

  const handleUpdate = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.put("/api/users/" + editUser._id, formData, { headers });

      if (response.status === 200) {
        setAlert({ show: true, variant: "success", message: "User Updated Successfully" });
        setFormData({ name: "", username: "", password: "" });
        fetchUsers();
        setEditUser({});
      } else {
        setAlert({ show: true, variant: "danger", message: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setAlert({ show: true, variant: "danger", message });
    }
  };
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };
  const handleAdd = async (e) => {
    setEditUser({});
    setFormData({ name: "", password: "", username: "" });
    setAddUser(true);
  };
  return (<>
   <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Group Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link onClick={handleAdd}>Add User</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <div className="table-responsive">
      <Alert show={alert.show} variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
        {alert.message}
      </Alert>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>
              Actions{" "}
            </th>
          </tr>
        </thead>

        <tbody>
          {addUser && (
            <tr>
              <td>0</td>
              <td>
                <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
              </td>
              <td>
                <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
              </td>
              <td>
                <Form.Control type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={handleSubmit}>Save</Button>
              </td>
            </tr>
          )}

          {users.map((el, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>
                {editUser._id === el._id
                  ? <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
                  : el.name
                }
              </td>
              <td>
                {editUser._id === el._id
                  ? <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
                  : el.username
                }
              </td>
              <td>
                {editUser._id === el._id && <Form.Control type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />}
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => editUser._id === el._id ? handleUpdate() : handleEdit(el)}>
                  {editUser._id === el._id ? "Update" : "Edit"}
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(el._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default UserList;
