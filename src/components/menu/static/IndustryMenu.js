import React, { Component } from "react";
import "../../../styles/navbar.scss";
import { Link } from "gatsby";

class IndustryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="menu-links">
        <li>
          <Link to="/industries/retail-distribution">Retail/Distribution</Link>
        </li>
        <li>
          <Link to="/industries/industrial-manufacturing">
            Industrial/Manufacturing
          </Link>
        </li>
        <li>
          <Link to="/industries/banking-insurance">
            Banking &amp; Insurance
          </Link>
        </li>
        <li>
          <Link to="/industries/communications-services">
            Communications &amp; Services
          </Link>
        </li>
      </ul>
    );
  }
}

export default IndustryMenu;
