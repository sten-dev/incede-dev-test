import React, { Component } from "react";
import "../../../styles/navbar.scss";
import { Link } from "gatsby";

class AboutUsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { toggleAboutUsMenu } = this.props;
    return (
      <ul className="menu-links">
        <li onClick={toggleAboutUsMenu}>
          <Link to="/about">Leadership</Link>
        </li>
        <li onClick={toggleAboutUsMenu}>
          <Link to="/about">Careers</Link>
        </li>
        <li onClick={toggleAboutUsMenu}>
          <Link to="/about">Partnerships</Link>
        </li>
      </ul>
    );
  }
}

export default AboutUsMenu;
