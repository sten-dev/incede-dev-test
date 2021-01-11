import React, { Component } from "react";
import "../../styles/menu.scss";
import { Container } from "reactstrap";
import logo from "../../img/logo_white.png";
import arrow from "../../img/arrow.svg";
import close from "../../img/close.svg";
import { Link } from "gatsby";
import ServiceMenu from "./static/ServiceMenu";
import IndustryMenu from "./static/IndustryMenu";
import SolutionMenu from "./static/SolutionMenu";
import WhyIncedeMenu from "./static/WhyIncedeMenu";
import AboutUsMenu from "./static/AboutUsMenu";
import ResourceMenu from "./static/ResourceMenu";

class MenuSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      showService: false,
      showSolution: false,
      showIndustry: false,
      showResource: false,
      showWhyIncede: false,
      showAboutUs: false,
    };
  }
  showService = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showService: !this.state.showService,
    });
  };
  showSolution = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showSolution: !this.state.showSolution,
    });
  };
  showIndustry = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showIndustry: !this.state.showIndustry,
    });
  };
  showResource = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showResource: !this.state.showResource,
    });
  };
  showWhyIncede = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showWhyIncede: !this.state.showWhyIncede,
    });
  };
  showAboutUs = () => {
    this.setState({
      showSubMenu: !this.state.showSubMenu,
      showAboutUs: !this.state.showAboutUs,
    });
  };
  render() {
    return (
      <section className="menu-section">
        <Container
          fluid
          style={{
            padding: " 0.5rem 1rem",
            height: "100vh",
            overflow: "auto",
            color: "#fff",
          }}
        >
          <div className="m-0 flex-column ">
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src={logo}
                  alt="incede.ai"
                  style={{ width: "220px" }}
                />
              </div>
              <div className="align-self-center menu-close">
                <img
                  src={close}
                  alt="close"
                  style={{ width: "16px" }}
                  onClick={this.props.toggle}
                />
              </div>
            </div>
            {!this.state.showSubMenu && (
              <React.Fragment>
                <div className="menu-items">
                  <Link to="/">
                    <span onClick={this.props.toggle}>Home</span>
                  </Link>
                </div>
                {/* <div className="menu-items">
                  <Link to="/about">
                    <span onClick={this.props.toggle}>About Us</span>
                  </Link>
                </div> */}
              </React.Fragment>
            )}
            {(!this.state.showSubMenu || this.state.showService) && (
              <div className="menu-items">
                <span onClick={this.showService} className="d-inline-flex">
                  {this.state.showService && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)",
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  Services
                  {!this.state.showService && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )}
            {this.state.showSubMenu && this.state.showService && (
              <React.Fragment>
                <ServiceMenu />
              </React.Fragment>
            )}

            {(!this.state.showSubMenu || this.state.showSolution) && (
              <div className="menu-items">
                <span onClick={this.showSolution} className="d-inline-flex">
                  {this.state.showSolution && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)",
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  Solutions
                  {!this.state.showSolution && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )}
            {this.state.showSubMenu && this.state.showSolution && (
              <React.Fragment>
                <SolutionMenu />
              </React.Fragment>
            )}

            {(!this.state.showSubMenu || this.state.showIndustry) && (
              <div className="menu-items">
                <span onClick={this.showIndustry} className="d-inline-flex">
                  {this.state.showIndustry && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)",
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  Industries
                  {!this.state.showIndustry && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )}
            {this.state.showSubMenu && this.state.showIndustry && (
              <React.Fragment>
                <IndustryMenu />
              </React.Fragment>
            )}

            {(!this.state.showSubMenu || this.state.showResource) && (
              <div className="menu-items">
                <span onClick={this.showResource} className="d-inline-flex">
                  {this.state.showResource && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)",
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  Resources
                  {!this.state.showResource && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )}
            {this.state.showSubMenu && this.state.showResource && (
              <React.Fragment>
                <ResourceMenu />
              </React.Fragment>
            )}

            {/* why-incede-link */}
            {!this.state.showSubMenu && (
              <React.Fragment>
                <div className="menu-items">
                  <Link to="/why-incede">
                    <span onClick={this.props.toggle}>Why Incede</span>
                  </Link>
                </div>
                {/* <div className="menu-items">
                  <Link to="/about">
                    <span onClick={this.props.toggle}>About Us</span>
                  </Link>
                </div> */}
              </React.Fragment>
            )}
            {/* {(!this.state.showSubMenu || this.state.showWhyIncede) && (
              <div className="menu-items">
                <span onClick={this.showWhyIncede} className="d-inline-flex">
                  {this.state.showWhyIncede && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)"
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  Why Incede
                  {!this.state.showWhyIncede && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )} */}
            {this.state.showSubMenu && this.state.showWhyIncede && (
              <React.Fragment>
                <WhyIncedeMenu />
              </React.Fragment>
            )}

            {/* {(!this.state.showSubMenu || this.state.showAboutUs) && (
              <div className="menu-items">
                <span onClick={this.showAboutUs} className="d-inline-flex">
                  {this.state.showAboutUs && (
                    <React.Fragment>
                      <img
                        src={arrow}
                        alt="next"
                        style={{
                          width: "11px",
                          marginTop: "4px",
                          transform: "scaleX(-1)"
                        }}
                      />
                      &nbsp;&nbsp;
                    </React.Fragment>
                  )}
                  About Us
                  {!this.state.showAboutUs && (
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <img
                        src={arrow}
                        alt="next"
                        style={{ width: "11px", marginTop: "4px" }}
                      />
                    </React.Fragment>
                  )}
                </span>
              </div>
            )} */}
            {this.state.showSubMenu && this.state.showAboutUs && (
              <React.Fragment>
                <AboutUsMenu />
              </React.Fragment>
            )}
          </div>
        </Container>
      </section>
    );
  }
}

export default MenuSection;
