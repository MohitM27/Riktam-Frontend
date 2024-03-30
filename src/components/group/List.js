import React, { useState, useEffect } from "react";
import { Col, InputGroup, FormControl, Image } from "react-bootstrap";
import axios from "axios";

const List = ({ setGroupId }) => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(groups);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(searchText)
    );
    setFilteredGroups(filtered);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("/api/groups", { headers });
        setFilteredGroups(response.data);
        setGroups(response.data);
      } catch (error) {
        console.error("Fetch groups error:", error);
      }
    };

    fetchGroups();
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="side-one">
      <div className="row heading">
        <Col sm={3} xs={3} className="heading-avatar">
          <div className="heading-avatar-icon">
            <Image
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              roundedCircle
            />
          </div>
        </Col>
        <Col
          sm={5}
          xs={5}
          className="heading-dot text-end"
          style={{ cursor: "pointer" }}
        >
          <i
            className="fa fa-users fa-2x"
            aria-hidden="true"
            onClick={() => setGroupId(0)}
          ></i>
        </Col>
        <Col
          sm={2}
          xs={2}
          className="heading-dot text-end"
          style={{ cursor: "pointer" }}
        >
          <i
            className="fa fa-hand-o-right fa-2x"
            aria-hidden="true"
            onClick={handleLogout}
          ></i>
        </Col>
      </div>

      <div className="row searchBox">
        <Col sm={12} className="searchBox-inner">
          <InputGroup>
            <FormControl
              id="searchText"
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <InputGroup.Text>
              <i className="fa fa-search"></i>
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </div>

      <div className="row sideBar">
        {filteredGroups.map((grp, i) => (
          <div
            className="row sideBar-body"
            onClick={() => setGroupId(grp._id)}
            key={i + 1}
          >
            <Col sm={3} xs={3} className="sideBar-avatar">
              <div className="avatar-icon">
                <Image
                  src={`https://bootdey.com/img/Content/avatar/avatar${
                    (i + 1) % 8 === 0 ? 1 : (i + 1) % 8
                  }.png`}
                  alt="group-icon"
                  roundedCircle
                />
              </div>
            </Col>
            <Col sm={9} xs={9} className="sideBar-main">
              <div className="row">
                <Col sm={12} xs={12} className="sideBar-name">
                  <span className="name-meta">{grp.name}</span>
                </Col>
              </div>
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
