import React, { Component } from 'react';

import waIcon from "../../../img/waAgent.svg";
import agentIcon from "../../../img/agent.png";
const LastWAIcon = (props) => {
    return (
        <React.Fragment>
            {props.isAgent ? (
                <div className="agent-icon">
                    <img
                        src={agentIcon}
                        alt="incede.ai"
                    />
                </div>
            ) : (
                    <img
                        src={waIcon}
                        alt="incede.ai"
                    />
                )}
        </React.Fragment>
    );
}

export default LastWAIcon;