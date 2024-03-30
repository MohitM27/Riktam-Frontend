import React, { useState, useEffect, Suspense } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axios from "axios";

const GroupDetails = ({ id }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const response = await axios.get(`/api/groups/${id}`, { headers });
        setGroup(response.data);
      } catch (error) {
        console.error("Fetch group error:", error);
      }
    };

    fetchGroup();
  }, [id]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {group && (
        <Row className="heading">
          <Col sm={2} md={1} xs={3} className="heading-avatar">
            <div className="heading-avatar-icon">
              <Image
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="group-icon"
                roundedCircle
              />
            </div>
          </Col>
          <Col sm={8} xs={7} className="heading-name">
            <span className="heading-name-meta">{group.name}</span>
          </Col>
          {/* <Col sm={1} xs={1} className="heading-dot pull-right">
            <i className="fa fa-ellipsis-v fa-2x pull-right" aria-hidden="true"></i>
          </Col> */}
        </Row>
      )}
    </Suspense>
  );
};

export default GroupDetails;
