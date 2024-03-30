import React, { useState, useEffect } from "react";
import List from "./List";
import "./list.css";
import GroupDetails from "./GroupDetails";
import SendMessage from "../message/SendMessage";
import MessageList from "../message/MessageList";
import CreateGroup from "./CreateGroup";
const GroupList = () => {
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="container-fluid group-app p-0">
      <div className="row app-one m-0" style={{height:599}}>
        <div className="col-sm-4 side">
          <List setGroupId={setGroupId} />
        </div>

        {groupId ? (
          <div className="col-sm-8 conversation" >
            <GroupDetails id={groupId} />
            <MessageList id={groupId} />
            <SendMessage id={groupId} />
          </div>
        ) : groupId === 0 ? (
          <CreateGroup />
        ) : null}
      </div>
    </div>
  );
};

export default GroupList;
