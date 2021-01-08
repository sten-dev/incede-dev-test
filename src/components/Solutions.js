import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import "../styles/what-we-do.scss";
import { Container, Row, Col } from "reactstrap";
// import SolutionView from "./Solutions/SolutionView";
import SolutionsSmallCardsList from "./Solutions/SolutionsSmallCardsList";
import SolutionsSmallCardBody from "./Solutions/SolutionsSmallCardBody";

class Solutions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  handleChange = index => {
    this.setState({ activeIndex: index });
  };
  render() {
    const { data } = this.props;
    // const { edges: solutions } = data.allMarkdownRemark;
    // console.log(solutions);
    const solutions = [
      {
        data: {
          image: "img/customer-service.png",
          inactiveImage: "img/customer-service-inactive.png",
          title: "Customer Service",
          subTitle: "Conversational AI Creates an Engaging Customer Experience",
          mainContext:
            " Conversational AI solutions primarily designed to take over inquiries coming into the customer service desk. Customer service solutions provide answers to product questions, return and exchange policies, damaged in shipping claims and credit card disputes.",
          sideContext:
            "Increases response time to customer inquiries.Increases volume of incoming requests to the service desk.Automation of routine tasks and transactions."
        },
        path: "/solutions/customer-service"
      },

      {
        data: {
          image: "img/human-resources-service.png",
          inactiveImage: "img/human-resources-service-inactive.png",
          title: "Human Resource Services",
          subTitle: "Conversational AI Puts the Focus on the People-part of HR",
          mainContext:
            "Human Resource Services primarily designed to automate routine questions and queries coming into HR. HR solutions provide answers to vacation time, entitlements, hour tracking, overtime pay and the rules and regulations in the workplace.",
          sideContext:
            "Allows HR specialists to serve exceptional or sensitive matters.Provides positional and employee-specific answers to inquiries.Available to support employees across all shifts, any time of the day or night."
        },
        path: "/solutions/human-resource-services"
      },
      {
        data: {
          image: "img/it-service-desk.png",
          inactiveImage: "img/it-service-desk-inactive.png",
          title: "IT Service Desk",
          subTitle:
            "Level-2 Quality Enabled through Natural Language Understanding",
          mainContext:
            "IT Service Desk AI solutions are designed to automate parts of the service desk and to effectively solve IT problems more quickly. IT service desk solutions provide answers to product questions, return and exchange policies, damaged in shipping claims and credit card disputes.",
          sideContext:
            "Automate onboarding, off-boarding tasks for employees.Provide troubleshooting and suggestions to problems.Validate problem tickets contain relevant, required information.Auto-escalate issues to human agents to serve highest-urgency problems."
        },
        path: "/solutions/it-service-desk"
      },
      {
        data: {
          image: "img/sales-support-solutions.png",
          inactiveImage: "img/sales-support-solutions-inactive.png",
          title: "Sales Support Solutions",
          subTitle: "Enabling Sales to Sell and Engineering to Engineer",
          mainContext:
            "Sales Support solutions are designed to help salespeople during the sales cycle using AI solutions. Sales support solutions provide answers to product questions, upsell and cross-sell recommendations, retrieve product or service documentation and verify product compatibility and cross-references.",
          sideContext:
            "Allows support engineers and technicians to support exceptional, high-value opportunities.Available to support sellers anytime – when their prospects expect answers.Prompt sellers to gather and provide relevant, required information about a product or service."
        },
        path: "/solutions/sales-support-solutions"
      }
    ];

    return (
      <section className="solutions">
        <Container>
          <Row className="wwd-list">
            {solutions.map((x, i) => {
              let solution = x.data;
              let path = x.path;
              return (
                <Col
                  key={i}
                  className="wwd-list-card mb-0"
                  xs={6}
                  sm={4}
                  lg={2}
                >
                  <SolutionsSmallCardsList
                    solution={solution}
                    path={path}
                    index={i}
                    isActive={this.state.activeIndex === i ? true : false}
                    onItemClick={index => this.handleChange(index)}
                  />
                  {/* <SolutionView solution={solution} path={path} /> */}
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
              <SolutionsSmallCardBody
                data={solutions[this.state.activeIndex].data}
                path={solutions[this.state.activeIndex].path}
              />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

Solutions.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query SolutionsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "solutions-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              html
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
    render={data => <Solutions data={data} />}
  />
);
