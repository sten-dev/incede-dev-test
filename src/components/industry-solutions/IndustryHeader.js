import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import ScrollMenu from "react-horizontal-scrolling-menu";
import IndustryImage from "../../img/industry-solution/banner-industry.png";

let list = [
  { name: "Retail/Distribution" },
  { name: "Industrial/Manufacturing" },
  { name: "Banking & Insurance" },
  { name: "Communications & Services" }
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

class IndustryHeader extends Component {
  constructor(props) {
    super(props);
    this.menu = null;

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
    let url = "/industries/retail-distribution";
    switch (key) {
      case "Retail/Distribution":
        url = "/industries/retail-distribution";
        break;
      case "Industrial/Manufacturing":
        url = "/industries/industrial-manufacturing";
        break;
      case "Banking & Insurance":
        url = "/industries/banking-insurance";
        break;
      case "Communications & Services":
        url = "/industries/communications-services";
        break;

      default:
        url = "/industries/retail-distribution";
        break;
    }
    window.location.href = url;
  };
  componentDidMount = () => {
    let path = window.location.pathname;
    switch (path) {
      case "/industries/retail-distribution":
      case "/industries/retail-distribution/":
        this.setState({ selected: "Retail/Distribution" });
        break;
      case "/industries/industrial-manufacturing":
      case "/industries/industrial-manufacturing/":
        this.setState({ selected: "Industrial/Manufacturing" });
        break;
      case "/industries/banking-insurance":
      case "/industries/banking-insurance/":
        this.setState({ selected: "Banking & Insurance" });
        break;
      case "/industries/communications-services":
      case "/industries/communications-services/":
        this.setState({ selected: "Communications & Services" });
        break;
      default:
        this.setState({ selected: "Retail/Distribution" });
        break;
    }
  };
  render() {
    const menu = this.menuItems;
    return (
      <section className="industry-header header-section text-center">
        <Container>
          <Row className="gap-y-quarter">
            <Col lg={8} md={7} sm={12} xs={12}>
              <article className="text-left">
                <h1 className="title display-3">Industries</h1>
                <h5 className="text-white sub-title">
                  Incede industry experience accelerates the deployment of
                  smarter IBM Watson solutions.
                </h5>
              </article>
            </Col>
            <Col lg={4} md={5} className="d-none d-md-block position-initial">
              <div className="image-section solutions-header-image">
                <img src={IndustryImage} alt="hero" />
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

export default IndustryHeader;
