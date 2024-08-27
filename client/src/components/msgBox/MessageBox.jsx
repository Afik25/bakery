import React from "react";
import "./message-box.css";
import {
  BsInfoCircle,
  BsCheckCircle,
  GoAlert,
  MdOutlineErrorOutline,
} from "../../middlewares/icons";

const MessageBox = ({ type, text }) => {
  return (
    <div className="msg-box fade-in">
      <div className="msg-box-container">
        <div className="icon-wrapper">
          {type === "info" && <BsInfoCircle className="icon icon-info" />}
          {type === "success" && <BsCheckCircle className="icon icon-success" />}
          {type === "warning" && <GoAlert className="icon icon-warning" />}
          {type === "error" && (
            <MdOutlineErrorOutline className="icon icon-error" />
          )}
        </div>
        <div className="msg-details">
          <h3 className="title t-2">
            {type === "info" && "Information"}
            {type === "success" && "Success"}
            {type === "warning" && "Warning"}
            {type === "error" && "Error"}
          </h3>
          <p className="title t-3">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
