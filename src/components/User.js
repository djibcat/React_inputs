import React from "react";
import "./User.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const inconDelete = <FontAwesomeIcon icon={faTimes} />;

export default function User(props) {
  const deleteUser = () => {
    props.deleteClick(props.id);
  };
  return (
    <div className="userContainer">
      <div className="userTab">
        <div className="usersDetails">
          <p>N° {props.id}</p>
        </div>
        <div className="usersDetails">
          <p>{props.name}</p>
        </div>
        <div className="usersDetails">
          <p> {props.firstName}</p>
        </div>
        <div className="usersDetails">
          <p> {props.email}</p>
        </div>
        <div className="usersDetails">
          <p>{props.age}</p>
        </div>
        <div className="usersDetails">
          <i onClick={() => deleteUser()}>{inconDelete}</i>
        </div>
      </div>
    </div>
  );
}
