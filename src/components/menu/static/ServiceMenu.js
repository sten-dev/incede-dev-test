import React from "react";
import "../../../styles/navbar.scss";
import { Link } from "gatsby";

class ServiceMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul className="menu-links">
        <li>
          <Link to="/services/watson-assistant-services">
            Watson Assistant Services
          </Link>
        </li>
        <li>
          <Link to="/services/watson-discovery-services">
            Watson Discovery Services
          </Link>
        </li>
        <li>
          <Link to="/services/watson-api">Watson API Services</Link>
        </li>
      </ul>
    );
  }
}

export default ServiceMenu;
