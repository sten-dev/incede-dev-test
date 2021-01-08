import React, { Component } from "react";
import "../../../styles/navbar.scss";
import { Link } from "gatsby";

export default class ResourceMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="menu-links">
        <li>
          <Link to="/resources/resource-library">Resource Library</Link>
        </li>
        <li>
          <Link to="/resources/events">Events</Link>
        </li>
        <li>
          <Link to="/resources/case-studies">Case Studies</Link>
        </li>
      </ul>
    );
  }
}
