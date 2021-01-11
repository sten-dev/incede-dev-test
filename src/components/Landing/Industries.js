import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import "../../styles/what-we-do.scss";
import { Container, Row, Col } from "reactstrap";
import IndustrySmallCardsList from "./industry/IndustrySmallCardsList";
import IndustrySmallCardBody from "./industry/IndustrySmallCardBody";
class Industries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  handleChange = index => {
    this.setState({ activeIndex: index });
  };
  render() {
    // const { data } = this.props;
    // const { edges: industries } = data.allMarkdownRemark;
    // console.log("industries", industries);
    const industries = [
      {
        data: {
          image: "img/retail-consumer-packaged-goods.png",
          inactiveImage: "img/retail-consumer-packaged-goods-inactive.png",
          title: "Retail / Distribution",
          subTitle: "",
          mainContext:
            "Engaging with customers on a more personal level is one way big box, boutique, on-line retailers are growing or, in some cases, surviving.  IBM Watson enables AI for in-store, kiosk and online for customers and sales associates to know more and find, purchase or return products more easily.",
          sideContext:
            "Help consumers find exactly what they’re looking for.Faster responses to social media inquiries.Increase Net Promoter Score (NPS)."
        },
        path: "/industries/retail-distribution"
      },
      {
        data: {
          image: "img/manufacturing.png",
          inactiveImage: "img/manufacturing-inactive.png",
          title: "Industrial / Manufacturing",
          subTitle: "",
          mainContext:
            "IBM Watson is at work in all areas of manufacturing. Engineers are spending more time innovating and less time researching.  Watson AI uses images to inspect quality and both suppliers and buyers are engaged to mitigate exposure in the supply chain.",
          sideContext:
            "Boost safety and productivity for new employee onboarding – anytime and anywhere.Reduce engineer-time spent on research.Bridge knowledge transfer from the past wisdom and learnings."
        },
        path: "/industries/industrial-manufacturing"
      },
      {
        data: {
          image: "img/financial-performance-management.png",
          inactiveImage: "img/financial-performance-management-inactive.png",
          title: "Banking & Insurance",
          subTitle: "",
          mainContext:
            "Banking and insurance organizations are using Watson AI in their race to boldly innovate and automate their customer engagement strategies. Their customer service processes are transformed with rich conversational AI and Watson AI will accelerate post-recession regulatory and compliance enhancements.",
          sideContext:
            "Cultivate one-to-one relationship with customers and employees.Understand customer sentiment and alter actions accordingly. Enables faster and more responsive customer services."
        },
        path: "/industries/banking-insurance"
      },
      {
        data: {
          image: "img/communications.png",
          inactiveImage: "img/communications-inactive.png",
          title: "Communications & Services",
          subTitle: "",
          mainContext:
            "Watson AI is enriching the value of data and service offerings for communications and services organizations through NLU/NLP and Watson is boosting their field team’s knowledge for higher-value customers interactions.",
          sideContext:
            "Increase the number of return customers.Answer questions instantly, reduce call center volumes.Increase productivity of Field Services with access to the organization’s knowledge base."
        },
        path: "/industries/communications-services"
      }
    ];
    return (
      <section className="industries">
        <Container>
          <Row className="wwd-list">
            {industries.map((x, i) => {
              let industry = x.data;
              let path = x.path;

              return (
                <Col
                  key={i}
                  className="wwd-list-card mb-0"
                  xs={6}
                  sm={4}
                  lg={2}
                >
                  <IndustrySmallCardsList
                    industry={industry}
                    path={path}
                    index={i}
                    isActive={this.state.activeIndex === i ? true : false}
                    onItemClick={index => this.handleChange(index)}
                  />
                  {/* <IndustryView
                    className="wwd-list-card"
                    industry={industry}
                    path={path}
                  /> */}
                </Col>
              );
            })}
          </Row>
        </Container>
        <Container
          fluid
          style={{ background: "rgba(122, 121, 121, 0.06)" }}
          className="gap-y"
        >
          <Row>
            <Col xs={12}>
              <IndustrySmallCardBody
                data={industries[this.state.activeIndex].data}
                path={industries[this.state.activeIndex].path}
              />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

Industries.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query IndustriesQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "industries" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                subTitle
                image {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Industries data={data} />}
  />
);
