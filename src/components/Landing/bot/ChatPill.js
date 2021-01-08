import React from "react";
import waIcon from "../../../img/waAgent.svg";
import agentIcon from "../../../img/agent.png";
import LastWAIcon from "./LastWAIcon";
export const ChatPill = props => {
  return (
    <div
      className={`chat-section-${props.right ? 'right' : 'left'}  d-flex ${
        props.right ? "justify-content-end" : "justify-content-start"
        } ${props.isLastWAUser ? 'is-last-wa-user' : ''}`}
    >
      {props.isLastWAUser && (
        <div className="d-none d-md-block wa-user">
          <LastWAIcon isAgent={props.right === "AG"} />
        </div>
      )}
      <section
        className={`chat-pill ${props.user ? `user-${props.user.toLowerCase()}` : ''} ${props.right ? "right-pill" : "left-pill"}`}
      >
        {props.text ? (
          <p
            className="chat-text"
            dangerouslySetInnerHTML={{ __html: props.text }}
          ></p>
        ) : (
            props.children
          )}
      </section>
    </div>
  );
};
