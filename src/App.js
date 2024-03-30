import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import UserList from "./components/user/UserList";
import GroupList from "./components/group/GroupList";
import useAuth from "./hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/users"
          element={
            isAuthenticated && isAdmin ? (
              <UserList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/groups"
          element={
            isAuthenticated && !isAdmin ? (
              <GroupList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/"
          element={<Navigate to={isAdmin ? "/users" : "/groups"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
