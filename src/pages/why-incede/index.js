import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert
} from "reactstrap";
import Transition from "../../Transition";
import Layout from "../../components/Layout";
import ServicesSmallCardsList from "../../components/services/ServicesSmallCardsList";
import arrow from "../../img/arrow.svg";
import arrowPrimary from "../../img/arrow-primary.png";
import "../../styles/why-incede.scss";

import MoreDetail from "../../components/Landing/MoreDetail";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ResultsInBusinessTerms from "./why-incede-sub-items/ResultsInBusinessTerms";
import CertifiedExpertise from "./why-incede-sub-items/CertifiedExpertise";
import CustomerSuccess from "./why-incede-sub-items/CustomerSuccess";
import TechnologyPartners from "./why-incede-sub-items/TechnologyPartners";
import LeaderShipTeam from "./why-incede-sub-items/LeaderShipTeam";
import { Link, animateScroll as scroll } from "react-scroll";

const subItems = [
  {
    image: "/img/why-incede/business-terms.png",
    inactiveImage: "/img/why-incede/business-terms-inactive.png",
    title: "Results in Business Terms"
  },
  {
    image: "/img/why-incede/certified-expertise.png",
    inactiveImage: "/img/why-incede/certified-expertise-inactive.png",
    title: "Certified Expertise"
  },
  {
    image: "/img/why-incede/customer-successes.png",
    inactiveImage: "/img/why-incede/customer-successes-inactive.png",
    title: "Customer Successes"
  },
  {
    image: "/img/why-incede/incede-technology-partners.png",
    inactiveImage: "/img/why-incede/incede-technology-partners-inactive.png",
    title: "Technology Partners"
  },
  {
    image: "/img/leadership.png",
    inactiveImage: "/img/leadership-inactive.png",
    title: "Leadership Team"
  }
];

export const Menu = (subItems, activeIndex) =>
  subItems.map((x, i) => {
    let data = x;
    return (
      <div className="wwd-list-card api-services-cards mb-0" key={i}>
        <ServicesSmallCardsList
          service={data}
          index={i}
          isActive={activeIndex === i ? true : false}
          onItemClick={() => { }}
        />
      </div>
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class WhyIncede extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      clickWhenDrag: false,
      alignCenter: false,
      dragging: true,
      hideArrows: false,
      hideSingleArrow: true,
      itemsCount: subItems.length,
      scrollToSelected: false,
      selected: 0,
      translate: 0,
      transition: 0.3,
      wheel: false,
      menuItems: Menu(subItems.slice(0, subItems.length), 0),
      linkId: ""
    };
  }

  componentDidMount = () => {
    if (window.location.hash.length > 0) {
      let hash = window.location.hash.split("#")[1];
      let activeIndex = 0;
      switch (hash) {
        case "business-terms":
          activeIndex = 0;
          break;
        case "certified-expertise":
          activeIndex = 1;
          break;
        case "customer-success":
          activeIndex = 2;
          break;
        case "technology-partners":
          activeIndex = 3;
          break;
        case "leadership-team":
          activeIndex = 4;
          break;
        default:
          activeIndex = 0;
          hash = "business-terms";
          break;
      }
      this.setState(
        {
          activeIndex,
          menuItems: Menu(subItems.slice(0, subItems.length), activeIndex),
          linkId: "business-terms"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link-why-incede").click();
          }, 500);
        }
      );
    }
  };

  onSelect = key => {
    let linkId;
    switch (Number(key)) {
      case 0:
        linkId = "business-terms";
        break;
      case 1:
        linkId = "certified-expertise";
        break;
      case 2:
        linkId = "customer-success";
        break;
      case 3:
        linkId = "technology-partners";
        break;
      case 4:
        linkId = "leadership-team";
        break;
      default:
        linkId = "business-terms";
        break;
    }
    // linkId = "business-terms";
    this.setState(
      {
        activeIndex: Number(key),
        menuItems: Menu(subItems.slice(0, subItems.length), Number(key)),
        linkId: "business-terms"
      },
      () => {
        setTimeout(() => {
          window.history.pushState("", "", `/why-incede#${linkId}`);
          document.getElementById("custom-react-link-why-incede").click();
        });
      }
    );
  };

  render() {
    let menu = this.state.menuItems;
    return (
      <React.Fragment>
        <Layout pageTitle="Why Incede | Incede">
          <Transition>
            <MoreDetail />
            <Link
              id="custom-react-link-why-incede"
              to={this.state.linkId}
              className="d-none"
              smooth={true}
            />

            <Container>
              <div className="section-tabs-container watson-api-scroll-container custom-services-img">
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
              </div>
            </Container>
            <Container
              fluid
              style={{ background: "rgba(122, 121, 121, 0.06)" }}
              className="gap-y industry-solution why-incede-container"
            >
              <Row>
                <Col xs={12}>
                  {this.state.activeIndex === 0 && <ResultsInBusinessTerms />}
                  {this.state.activeIndex === 1 && <CertifiedExpertise />}
                  {this.state.activeIndex === 2 && <CustomerSuccess />}
                  {this.state.activeIndex === 3 && <TechnologyPartners />}
                  {this.state.activeIndex === 4 && <LeaderShipTeam />}
                </Col>
              </Row>
            </Container>
          </Transition>
        </Layout>
      </React.Fragment>
    );
  }
}

export default WhyIncede;
