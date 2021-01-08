import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import ServicesImage from "../../img/services/banner-services.png";
import ScrollMenu from "react-horizontal-scrolling-menu";

let list = [
  { name: "Watson Assistant Services" },
  { name: "Watson Discovery Services" },
  { name: "Watson API Services" }
];
const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};
export const Menu = (list, selected) =>
  list.map(el => {
    const { name } = el;
    return <MenuItem text={name} key={name} selected={selected} />;
  });
const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class ServicesHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickWhenDrag: false,
      alignCenter: false,
      dragging: true,
      hideArrows: false,
      hideSingleArrow: true,
      itemsCount: list.length,
      scrollToSelected: false,
      selected: "Retail/Distribution",
      translate: 0,
      transition: 0.3,
      wheel: false
    };
    this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
  }
  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
    let url = "/services/watson-assistant-services";
    switch (key) {
      case "Watson Assistant Services":
        url = "/services/watson-assistant-services";
        break;
      case "Watson Discovery Services":
        url = "/services/watson-discovery-services";
        break;
      case "Watson API Services":
        url = "/services/watson-api";
        break;
      default:
        url = "/services/watson-assistant-services";
        break;
    }
    window.location.href = url;
  };
  componentDidMount = () => {
    let path = window.location.pathname;
    switch (path) {
      case "/services/watson-assistant-services":
      case "/services/watson-assistant-services/":
        this.setState({ selected: "Watson Assistant Services" });
        break;
      case "/services/watson-discovery-services":
      case "/services/watson-discovery-services/":
        this.setState({ selected: "Watson Discovery Services" });
        break;
      case "/services/watson-api":
      case "/services/watson-api/":
        this.setState({ selected: "Watson API Services" });
        break;
      default:
        this.setState({ selected: "Watson Assistant Services" });
        break;
    }
  };
  render() {
    const menu = this.menuItems;
    return (
      <section className="services-header header-section text-center">
        <Container>
          <Row className="gap-y-quarter">
            <Col lg={8} md={7} sm={12} xs={12}>
              <article className="text-left">
                <h1 className="title display-3">Services</h1>
                <h5 className="text-white sub-title">
                  Incede's partners are experts in helping organizations
                  understand and incorporate IBM’s Watson technology. We provide
                  end-to-end capabilities in developing conversational
                  interfaces and cognitive enterprise search applications with
                  Watson.
                </h5>
              </article>
            </Col>
            <Col lg={4} md={5} className="d-none d-md-block position-initial">
              <div className="image-section">
                <img src={ServicesImage} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="section-tabs-container">
          <Container>
            <ScrollMenu
              alignCenter={this.state.alignCenter}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              clickWhenDrag={this.state.clickWhenDrag}
              data={menu}
              dragging={this.state.dragging}
              hideArrows={this.state.hideArrows}
              hideSingleArrow={this.state.hideSingleArrow}
              onSelect={this.onSelect}
              onUpdate={this.onUpdate}
              ref={el => (this.menu = el)}
              selected={this.state.selected}
              transition={this.state.transition}
              translate={this.state.translate}
              wheel={this.state.wheel}
            />
          </Container>
        </Container>
      </section>
    );
  }
}

export default ServicesHeader;
