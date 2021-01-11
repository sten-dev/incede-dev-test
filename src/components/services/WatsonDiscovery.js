import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/services.scss";
// import picture1 from "../../img/services/watson-discovery-1.png";
// import picture2 from "../../img/services/watson-discovery-2.png";
import picture3 from "../../img/services/wd-design-services.png";
import enrichmentImage from "../../img/services/enrichment-development-services.png";
import smartDocument from "../../img/services/smart-document.png";
// import picture3 from "../../img/services/watson-discovery-3.png";
import picture4 from "../../img/services/watson-discovery-4.png";
import ServicesSmallCardsList from "./ServicesSmallCardsList";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link, animateScroll as scroll } from "react-scroll";

const discoverySubItems = [
  {
    image: "/img/watson-assistant/design-services.png",
    inactiveImage: "/img/watson-assistant/design-services-inactive.png",
    title: "Watson Discovery Design Services"
  },
  {
    image: "/img/watson-assistant/development-services.png",
    inactiveImage: "/img/watson-assistant/development-services-inactive.png",
    title: "Watson Discovery Development Services"
  },
  {
    image: "/img/watson-discovery/enrich-development-service.png",
    inactiveImage:
      "/img/watson-discovery/enrich-development-service-inactive.png",
    title: "Enrich Development Services"
  },
  {
    image: "/img/watson-discovery/smart-document-development.png",
    inactiveImage:
      "/img/watson-discovery/smart-document-development-inactive.png",
    title: "Smart Document Development Services"
  },
  // {
  //   image: "/img/watson-discovery/query-relevancy-development.png",
  //   inactiveImage:
  //     "/img/watson-discovery/query-relevancy-development-inactive.png",
  //   title: "Query Relevancy Development Services"
  // }
];

export const Menu = (discoverySubItems, activeIndex) =>
  discoverySubItems.map((x, i) => {
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
class WatsonDiscovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      clickWhenDrag: false,
      alignCenter: false,
      dragging: true,
      hideArrows: false,
      hideSingleArrow: true,
      itemsCount: discoverySubItems.length,
      scrollToSelected: false,
      selected: 0,
      translate: 0,
      transition: 0.3,
      wheel: false,
      menuItems: Menu(discoverySubItems.slice(0, discoverySubItems.length), 0),
      linkId: ""
    };
  }
  componentDidMount = () => {
    if (window.location.hash.length > 0) {
      let hash = window.location.hash.split("#")[1];
      let activeIndex = 0;
      let itemIndex = 0;
      switch (hash) {
        case "watson-discovery-design":
          activeIndex = 0;
          itemIndex = 0;
          break;
        case "watson-discovery-development":
          activeIndex = 1;
          itemIndex = 1;
          break;
        case "enrich-development":
          activeIndex = 2;
          itemIndex = 2;
          break;
        case "smart-document":
          activeIndex = 3;
          itemIndex = 3;
          break;
        // case "query-relevancy":
        //   activeIndex = 1;
        //   itemIndex = 4;
        //   break;
        default:
          activeIndex = 0;
          itemIndex = 0;
          hash = "watson-discovery-design";
          break;
      }
      this.setState(
        {
          activeIndex,
          menuItems: Menu(
            discoverySubItems.slice(0, discoverySubItems.length),
            itemIndex
          ),
          linkId: "watson-discovery-id"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link-discovery").click();
          }, 1000);
        }
      );
    }
  };

  handleChange = index => {
    this.setState({ activeIndex: index });
  };
  onSelect = key => {
    let activeIndex = Number(key);
    let menuItems = Menu(
      discoverySubItems.slice(0, discoverySubItems.length),
      Number(key)
    );
    let linkId;
    switch (Number(key)) {
      case 0:
        linkId = "watson-discovery-design";
        break;
      case 1:
        linkId = "watson-discovery-development";
        break;
      case 2:
        linkId = "enrich-development";
        break;
      case 3:
        linkId = "smart-document";
        break;
      default:
        linkId = "watson-discovery-design";
        break;
    }
    this.setState(
      {
        activeIndex: activeIndex,
        menuItems: menuItems,
        linkId: "watson-discovery-id"
      },
      () => {
        setTimeout(() => {
          document.getElementById("custom-react-link-discovery").click();
          window.history.pushState(
            "",
            "",
            `/services/watson-discovery-services#${linkId}`
          );
        });
      }
    );
  };
  render() {
    let menu = this.state.menuItems;
    return (
      <section className="services-content gap-y-half pb-0" id="3">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="content">
                <p id="watson-discovery-id" className="pt-2"></p>
                <h1 className="title text-primary text-uppercase">
                  <b>Watson Discovery Services</b>
                  <Link
                    id="custom-react-link-discovery"
                    to={this.state.linkId}
                    className="d-none"
                    smooth={true}
                  />
                </h1>
              </div>
            </Col>
          </Row>
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
          {/* <Row>
            <Col>
              <div className="content">
                <h1 className="title text-primary text-uppercase">
                  <b>Watson Discovery</b>
                </h1>
                <p>
                  Incede implements enterprise search and AIfor organizations to
                  surface relevant insights from stores ofdata and documents
                  from internal, external and public sources.
                </p>
              </div>
              <br />
              <div className="image-section">
                <img src={picture1} alt="support image" />
              </div>
              <br />
              <div className="content">
                <p>
                  Watson Discovery is IBM’s enterprise search and AI search
                  technology that breaks open data silos and retrieves specific
                  answers to your questions while analyzing trends and
                  relationships buried in enterprise data. More powerful than
                  traditional keyword search engines, Watson Discovery uses
                  natural language query to understand the semantics and
                  determine relevancy between the question and results. Adding
                  enrichments and machine learning, it applies training to
                  understand additional content and applies relevancy thresholds
                  to provide only meaningful results.
                </p>
              </div>
              <div className="content-outcomes">
                <h5>
                  <b className="color-grey">Outcomes</b>
                </h5>
                <ul>
                  <li>
                    <p>
                      Out-of-the-Box integration with conversational AI to find
                      answers to your questions.
                    </p>
                  </li>
                  <li>
                    <p>
                      Understands complex content in business documents such as
                      images and tables.
                    </p>
                  </li>
                  <li>
                    <p>
                      Utilizes both supervised and unsupervised relevancy
                      training to improve salience.
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col xs={12}>
              <div className="image-section">
                <img src={picture2} alt="support image" />
              </div>
            </Col>
          </Row>
          <br /> */}
        </Container>
        <Container
          fluid
          style={{ background: "rgba(122, 121, 121, 0.06)" }}
          className="gap-y"
        >
          <Row>
            <Col xs={12}>
              {this.state.activeIndex === 0 && (
                <Container>
                  <Row>
                    <Col>
                      <h4 className="text-uppercase">
                        <b className="color-grey">
                          Watson Discovery Design Services
                        </b>
                      </h4>
                      <div className="content">
                        <p>
                          Designing an enterprise search and AI search solutions
                          begins with an understanding of the targeted workflow
                          stakeholders – what do they need, where do they need
                          it and when do they need it. Incede develops a phased
                          Enterprise Search and AI Search Design for a solution
                          that meets the information needs, workflow
                          requirements, technical architectures and the
                          strategic imperatives while reducing risk and
                          delivering the necessary business value quickly.
                        </p>
                        <p>
                          We contrast the decision-making expectations of users
                          and the information they need to improve their
                          decision-making and identify the workflow and
                          knowledge opportunities for the enterprise search and
                          AI search solution. We confirm the data sources,
                          prioritize the annotation and enrichment methods and
                          plan the integrations to ensure a positive user
                          experience with relevant, trusted answers.
                        </p>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      lg={5}
                      className="mt-4 mt-lg-0 d-flex align-items-center"
                    >
                      <div className="image-section">
                        <img src={picture3} alt="support image" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="content-outcomes">
                        <h5>
                          <b className="color-grey">Outcomes</b>
                        </h5>
                        <ul>
                          <li>
                            <p>
                              Standardized inventory of document collections and
                              content areas to surface new insights in targeted
                              workflows.
                            </p>
                          </li>
                          <li>
                            <p>
                              Unified design of natural language question and
                              answer across channel, chat and the knowledge
                              base.
                            </p>
                          </li>
                          <li>
                            <p>
                              Iterative approach to deliver insights and
                              business value quickly.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
              {this.state.activeIndex === 1 && (
                <Container>
                  <Row>
                    <Col>
                      <h4 className="text-uppercase">
                        <b className="color-grey">
                          Watson Discovery Development Services
                        </b>
                      </h4>
                      <div className="content">
                        <p>
                          Getting users their highly relevant answers requires
                          savvy developers who navigate data complexities and
                          create enterprise search and AI search solutions that
                          are modeled and trained to the semantics of the
                          industry, the organization and the workflow.
                        </p>
                        <p>
                          From our internal and customer solutions, Incede has
                          developed frameworks, APIs, and plugins for the most
                          common use cases.
                        </p>
                      </div>
                      <div className="content-outcomes">
                        <h5>
                          <b className="color-grey">Outcomes</b>
                        </h5>
                        <ul>
                          <li>
                            <p>
                              Seamless integration of structured and
                              unstructured data.
                            </p>
                          </li>
                          <li>
                            <p>
                              Optimized relevancy training to improves user’s
                              trust in answers.
                            </p>
                          </li>
                          <li>
                            <p>
                              Best practices based development for greater
                              sustainability.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <Col xs={12}>
                      <div className="image-section">
                        <img src={picture4} alt="support image" />
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Ingest and Normalize Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p
                          id="enrich-development-sm"
                          className="d-none d-sm-block"
                        ></p>
                        <p>
                          Brings in the structured and unstructured data from
                          internal, external and/or public sources such as Box,
                          salesforce, Microsoft Sharepoint, web crawl and the
                          IBM Cloud Object Storage. Unstructured data within
                          documents such as pdf, MS Word, MS PowerPoint, MS
                          Excel, HTML and even scanned images are included.
                        </p>
                        <p
                          id="enrich-development-xs"
                          className="d-sm-none pt-3"
                        ></p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Enrichment Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Applies the understanding of what data is being
                          brought into the enterprise search and search AI
                          solution. Enrichments or meta data development
                          includes entity and category identification, semantics
                          and parts of speech parsing, sentimental analysis,
                          emotion identification, keywords, and concept tagging.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Advanced Enrichment Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p
                          id="smart-document-sm"
                          className="d-none d-sm-block"
                        ></p>
                        <p>
                          Applies custom or specialized natural language
                          enrichments using IBM Watson Knowledge Studio to
                          identify entities and relationships unique to your
                          business or organization. Advanced enrichment is used
                          for complex content such as images and tables to
                          improve the relevancy of answers.
                        </p>
                        <p
                          id="smart-document-xs"
                          className="d-sm-none pt-3"
                        ></p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Smart Document Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        {/* <p
                          id="query-relevancy-sm"
                          className="d-none d-sm-block"
                        ></p> */}
                        <p>
                          It is the process of teaching the solution, using
                          Smart Document Understand (SDU), how to understand the
                          structure of the documents and collections of
                          documents. Relevancy is assessed and improved through
                          training to ensure the system is ingesting other
                          documents in the collections.
                        </p>
                        {/* <p
                          id="query-relevancy-xs"
                          className="d-sm-none pt-3"
                        ></p> */}
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Query Relevancy Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Ranks relevancy and improves results through relevancy
                          training. Passages and user questions are analyzed for
                          relevancy before and after applying relevancy
                          training.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}



              {this.state.activeIndex === 2 && (
                <Container>
                  <Row>
                    <Col>
                      <h4 className="text-uppercase">
                        <b className="color-grey">
                          Enrichment Development Services
                        </b>
                      </h4>
                      <div className="content">
                        <p>
                          Incede expert team will apply the understanding of what data is being brought into the enterprise search and search AI solutions. Our enrichments or meta data development services includes entity and category identification, semantics and parts of speech parsing, sentimental analysis, emotion identification, keywords, and concept tagging. We can also apply custom or specialized natural language enrichments using IBM Watson Knowledge Studio to identify entities and relationships unique to your business or organization. Advanced enrichment is used for complex content such as images and tables to improve the relevancy of answers.
                        </p>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      lg={5}
                      className="mt-4 mt-lg-0 d-flex align-items-center"
                    >
                      <div className="image-section">
                        <img className="w-auto-h-100" src={enrichmentImage} alt="support image" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="content-outcomes">
                        <h5>
                          <b className="color-grey">Outcomes</b>
                        </h5>
                        <ul>
                          <li>
                            <p>
                              Increase user adoption by providing relevant results
                            </p>
                          </li>
                          <li>
                            <p>
                              Build smarter search and discovery applications
                            </p>
                          </li>
                          <li>
                            <p>
                              Standardized inventory of document collections and content areas to surface new insights in targeted workflows.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
              {this.state.activeIndex === 3 && (
                <Container>
                  <Row>
                    <Col>
                      <h4 className="text-uppercase">
                        <b className="color-grey">
                          Smart Document Development Services
                        </b>
                      </h4>
                      <div className="content">
                        <p>
                          Incede can help you with Smart Document Understand (SDU) capability of Watson Discovery. Our team can help you with the best practices on how to understand the structure of the documents and collections of documents. Management of splitting documents, importing models to further annotations of the document, Relevancy is assessed and improved through training to ensure the system is ingesting other documents in the collections. Incede’s expert team can help you with enrichments to your documents by additional enrichments to the text (and other) fields.
                        </p>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      lg={5}
                      className="mt-4 mt-lg-0 d-flex align-items-center"
                    >
                      <div className="image-section">
                        <img className="w-auto-h-100" src={smartDocument} alt="support image" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="content-outcomes">
                        <h5>
                          <b className="color-grey">Outcomes</b>
                        </h5>
                        <ul>
                          <li>
                            <p>
                              Build smarter search and discovery applications
                            </p>
                          </li>
                          <li>
                            <p>
                              Standardized inventory of document collections and content areas to surface new insights in targeted workflows.
                            </p>
                          </li>
                          <li>
                            <p>
                              Optimized relevancy training to improves users trust in answers.
                            </p>
                          </li>

                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}






            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default WatsonDiscovery;
