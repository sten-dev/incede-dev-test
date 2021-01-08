import React, { Component } from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";
import menu from "../img/menu.svg";
import "../styles/navbar.scss";
// import PageTransition from "gatsby-plugin-page-transitions";
import "../styles/bot.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Popover,
  PopoverBody,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import SolutionsMenu from "./menu/SolutionsMenu";
import ServicesMenu from "./menu/ServicesMenu";
import IndustriesMenu from "./menu/IndustriesMenu";
import dropdown from "../img/dropdown.svg";
import MenuSection from "./menu/MenuSection";
import ServiceMenu from "./menu/static/ServiceMenu";
import SolutionMenu from "./menu/static/SolutionMenu";
import IndustryMenu from "./menu/static/IndustryMenu";
import WhyIncedeMenu from "./menu/static/WhyIncedeMenu";
import AboutUsMenu from "./menu/static/AboutUsMenu";
import ResourceMenu from "./menu/static/ResourceMenu";

class INavbar extends Component {
  window;
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isWWDPopoverOpen: false,
      isServicesMenuOpen: false,
      isSolutionsMenuOpen: false,
      isIndustriesMenuOpen: false,
      isResourcesMenuOpen: false,
      isWhyIncedeMenuOpen: false,
      isAboutMenuOpen: false,
    };
  }

  componentDidMount() {
    this.window = window;
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = (event) => {
    var header = document.getElementById("header");

    if (window.pageYOffset !== 0) {
      if (!header.classList.contains("incede-nav-shadow")) {
        header.classList.add("incede-nav-shadow");
      }
    } else {
      header.classList.remove("incede-nav-shadow");
    }
  };

  parseJwt = () => {
    let token = this.getToken();
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(this.window.atob(base64));
    }
    return "";
  };

  getToken = () => {
    if (this.window && this.window.localStorage) {
      this.window.localStorage.removeItem("userAuthToken");
      let obj = this.window.localStorage.getItem("incedeAuthToken");
      return obj;
    }
    return null;
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  toggleWhatWeDoMenu = () => {
    this.setState({
      isWWDPopoverOpen: !this.state.isWWDPopoverOpen,
    });
  };
  toggleServicesMenu = () => {
    this.setState({
      isServicesMenuOpen: !this.state.isServicesMenuOpen,
    });
  };
  toggleSolutionsMenu = () => {
    this.setState({
      isSolutionsMenuOpen: !this.state.isSolutionsMenuOpen,
    });
  };
  toggleIndustriesMenu = () => {
    this.setState({
      isIndustriesMenuOpen: !this.state.isIndustriesMenuOpen,
    });
  };
  toggleResourcesMenu = () => {
    this.setState({
      isResourcesMenuOpen: !this.state.isResourcesMenuOpen,
    });
  };
  toggleWhyIncedeMenu = () => {
    this.setState({
      isWhyIncedeMenuOpen: !this.state.isWhyIncedeMenuOpen,
    });
  };
  toggleAboutUsMenu = () => {
    this.setState({
      isAboutMenuOpen: !this.state.isAboutMenuOpen,
    });
  };
  render() {
    return (
      <React.Fragment>
        {/* <PageTransition> */}

        <nav className="incede-nav " id="header">
          <Navbar color="white" expand="lg" light>
            <NavbarBrand>
              <Link to="/">
                <img src={logo} alt="incede" />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <img src={menu} alt="menu" />
            </NavbarToggler>
            <Collapse isOpen={false} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="btn">
                  <Link activeClassName="selected" to="/">
                    Home
                  </Link>
                </NavItem>

                <NavItem id="menu_services" className="btn">
                  <a>
                    Services{" "}
                    <img
                      className={`${
                        this.state.isServicesMenuOpen ? "active-what-we-do" : ""
                      }`}
                      alt="send"
                      src={dropdown}
                      // onClick={props.onClick}
                    />{" "}
                  </a>
                </NavItem>
                <NavItem id="menu_solutions" className="btn">
                  <a>
                    Solutions{" "}
                    <img
                      className={`${
                        this.state.isSolutionsMenuOpen
                          ? "active-what-we-do"
                          : ""
                      }`}
                      alt="send"
                      src={dropdown}
                      // onClick={props.onClick}
                    />{" "}
                  </a>
                </NavItem>
                <NavItem id="menu_industries" className="btn">
                  <a>
                    Industries{" "}
                    <img
                      className={`${
                        this.state.isIndustriesMenuOpen
                          ? "active-what-we-do"
                          : ""
                      }`}
                      alt="send"
                      src={dropdown}
                      // onClick={props.onClick}
                    />{" "}
                  </a>
                </NavItem>
                <NavItem id="menu_resources" className="btn">
                  <a>
                    Resources{" "}
                    <img
                      className={`${
                        this.state.isResourcesMenuOpen
                          ? "active-what-we-do"
                          : ""
                      }`}
                      alt="send"
                      src={dropdown}
                      // onClick={props.onClick}
                    />{" "}
                  </a>
                </NavItem>

                <NavItem id="menu_why_incede" className="btn">
                  <Link activeClassName="selected" to="/why-incede">
                    Why Incede
                  </Link>
                  {/* <a>
                        Why Incede{" "}
                        <img
                          className={`${
                            this.state.isWhyIncedeMenuOpen
                              ? "active-what-we-do"
                              : ""
                            }`}
                          alt="send"
                          src={dropdown}
                        // onClick={props.onClick}
                        />{" "}
                      </a> */}
                </NavItem>
                {/* <NavItem id="menu_about" className="btn">
                      <a>
                        About Us{" "}
                        <img
                          className={`${
                            this.state.isAboutMenuOpen ? "active-what-we-do" : ""
                            }`}
                          alt="send"
                          src={dropdown}
                        // onClick={props.onClick}
                        />{" "}
                      </a>
                    </NavItem> */}
              </Nav>
            </Collapse>
          </Navbar>

          <Popover
            boundariesElement="window"
            placement="bottom"
            isOpen={this.state.isServicesMenuOpen}
            target="menu_services"
            toggle={this.toggleServicesMenu}
            trigger="legacy"
            className="popover-main"
          >
            {/* <PopoverHeader>Popover Title</PopoverHeader> */}
            <PopoverBody>
              <ServiceMenu />
            </PopoverBody>
          </Popover>

          <Popover
            boundariesElement="window"
            placement="bottom"
            isOpen={this.state.isSolutionsMenuOpen}
            target="menu_solutions"
            toggle={this.toggleSolutionsMenu}
            trigger="legacy"
          >
            {/* <PopoverHeader>Popover Title</PopoverHeader> */}
            <PopoverBody>
              <SolutionMenu />
            </PopoverBody>
          </Popover>
          <Popover
            boundariesElement="window"
            placement="bottom"
            isOpen={this.state.isIndustriesMenuOpen}
            target="menu_industries"
            toggle={this.toggleIndustriesMenu}
            trigger="legacy"
          >
            {/* <PopoverHeader>Popover Title</PopoverHeader> */}
            <PopoverBody>
              <IndustryMenu />
            </PopoverBody>
          </Popover>
          <Popover
            boundariesElement="window"
            placement="bottom"
            isOpen={this.state.isResourcesMenuOpen}
            target="menu_resources"
            toggle={this.toggleResourcesMenu}
            trigger="legacy"
          >
            {/* <PopoverHeader>Popover Title</PopoverHeader> */}
            <PopoverBody>
              <ResourceMenu />
            </PopoverBody>
          </Popover>

          {/* <Popover
                boundariesElement="window"
                placement="bottom"
                isOpen={this.state.isWhyIncedeMenuOpen}
                target="menu_why_incede"
                toggle={this.toggleWhyIncedeMenu}
                trigger="legacy"
              >
              <PopoverBody>
                <WhyIncedeMenu />
              </PopoverBody>
              </Popover> * /}
              {/* <Popover
              boundariesElement="window"
              placement="bottom"
              isOpen={this.state.isAboutMenuOpen}
              target="menu_about"
              toggle={this.toggleAboutUsMenu}
              trigger="legacy"
            >
              <PopoverBody>
                <AboutUsMenu
                  toggleAboutUsMenu={() => this.toggleAboutUsMenu()}
                />
              </PopoverBody>
            </Popover> */}
          {/* <Popover
                popperClassName="what-we-do-menu"
                boundariesElement="window"
                placement="bottom"
                isOpen={this.state.isWWDPopoverOpen}
                target="whatWeDo"
                toggle={this.toggleWhatWeDoMenu}
                trigger="legacy"
              >
                <PopoverBody>
                  <Container fluid className="p-4">
                    <Row>
                      <Col lg={4} md={4} sm={12} xs={12}>
                        <h1 className="text-gray d-none d-sm-block">
                          What we do
                      </h1>
                        <h4
                          onClick={this.toggleWhatWeDoMenu}
                          className="d-block d-sm-none"
                        >
                          <img className="back-icon" alt="send" src={dropdown} />{" "}
                          What We Do
                      </h4>
                      </Col>
                      <br className="d-block d-md-none" />
                      <br className="d-block d-md-none" />
                      <br className="d-block d-md-none" />
                      <Col className="wwd-sub-menu" lg={4} md={4} sm={6} xs={12}>
                        <h5 className="mt-0">Services</h5>
                        <ServicesMenu />
                      </Col>
                      <Col className="wwd-sub-menu" lg={4} md={4} sm={6} xs={12}>
                        <h5 className="mt-0">Solutions</h5>
                        <SolutionsMenu />
                      </Col>
                    
                    </Row>
                  </Container>
                </PopoverBody>
              </Popover> */}
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            className="bot-side-menu"
            backdrop="static"
          >
            <ModalBody>
              <MenuSection toggle={this.toggle} />
            </ModalBody>
          </Modal>
        </nav>
        {/* </PageTransition> */}
      </React.Fragment>
    );
  }
}

export default INavbar;
