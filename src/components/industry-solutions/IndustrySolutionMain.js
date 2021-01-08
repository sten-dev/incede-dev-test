import React from "react";
import IndustryManufacturing from "./IndustryManufacturing";
import Banking from "./Banking";
import Communication from "./Communication";
import RetailDistribution from "./RetailDistribution";
import ViewMore from "./ViewMore";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import { Link, animateScroll as scroll, scroller } from "react-scroll";
import IndustryHeader from "./IndustryHeader";

class IndustrySolutionMain extends React.Component {
  refs;
  constructor(props) {
    super(props);
    this.state = { activeIndex: 1 };
  }

  handelClick = index => {
    this.setState({ activeIndex: index }, () => {
      scroller.scrollTo(String(index));
    });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <section className="industry-solution">
        <IndustryHeader />
        <Container>
          {/* {activeIndex === 1 && <RetailDistribution />}
          {activeIndex === 2 && <IndustryManufacturing />}
          {activeIndex === 3 && <Banking />}
          {activeIndex === 4 && <Communication />}
          {activeIndex === 5 && <ViewMore />} */}

          <Link
            activeClass="active"
            to="1"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <RetailDistribution />
          </Link>
          <Link
            activeClass="active"
            to="2"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <IndustryManufacturing />
          </Link>
          <Link
            activeClass="active"
            to="3"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <Banking />
          </Link>
          <Link
            activeClass="active"
            to="4"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <Communication />
          </Link>
        </Container>
      </section>
    );
  }
}

export default IndustrySolutionMain;
