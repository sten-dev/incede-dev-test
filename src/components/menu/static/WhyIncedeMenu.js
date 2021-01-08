import React, { Component } from "react";
import { Link } from "gatsby";
import "../../../styles/navbar.scss";

class WhyIncedeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul className="menu-links">
        <li>
          <Link to="/why-incede">
            Our Process
          </Link>
        </li>
        <li>
          <Link to="/why-incede">
            Our Expertise
          </Link>
        </li>
        <li>
          <Link to="/why-incede">
            Our Experience
          </Link>

        </li>
      </ul>
    );
  }
}

export default WhyIncedeMenu;
