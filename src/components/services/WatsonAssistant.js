import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/services.scss";
// import picture1 from "../../img/services/watson-assistant-1.png";
import picture2 from "../../img/services/wa-design-services.png";
// import picture2 from "../../img/services/watson-assistant-2.png";
// import picture3 from "../../img/services/watson-assistant-3.png";
import picture3 from "../../img/services/wa-development-services.png";
import picture4 from "../../img/services/watson-assistant-4.png";
import ServicesSmallCardsList from "./ServicesSmallCardsList";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link, animateScroll as scroll } from "react-scroll";

const assistantSubItems = [
  {
    image: "/img/watson-assistant/design-services.png",
    inactiveImage: "/img/watson-assistant/design-services-inactive.png",
    title: "Watson Assistant Design Services"
  },
  {
    image: "/img/watson-assistant/development-services.png",
    inactiveImage: "/img/watson-assistant/development-services-inactive.png",
    title: "Watson Assistant Development Services"
  },
  {
    image: "/img/watson-assistant/channel-development.png",
    inactiveImage: "/img/watson-assistant/channel-development-inactive.png",
    title: "Channel Development Services"
  },
  {
    image: "/img/watson-assistant/integration-development.png",
    inactiveImage: "/img/watson-assistant/integration-development-inactive.png",
    title: "Integration Development Services"
  },
  {
    image: "/img/watson-assistant/solution-training.png",
    inactiveImage: "/img/watson-assistant/solution-training-inactive.png",
    title: "Solution Training Services"
  }
];
export const Menu = (assistantSubItems, activeIndex) =>
  assistantSubItems.map((x, i) => {
    let data = x;
    return (
      <div className="wwd-list-card api-services-cards mb-0" key={i}>
        <ServicesSmallCardsList
          service={data}
          index={i}
          isActive={activeIndex === i ? true : false}
          onItemClick={() => {}}
        />
      </div>
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class WatsonAssistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      clickWhenDrag: false,
      alignCenter: false,
      dragging: true,
      hideArrows: false,
      hideSingleArrow: true,
      itemsCount: assistantSubItems.length,
      scrollToSelected: false,
      selected: 0,
      translate: 0,
      transition: 0.3,
      wheel: false,
      menuItems: Menu(assistantSubItems.slice(0, assistantSubItems.length), 0),
      linkId: ""
    };
  }
  componentDidMount = () => {
    if (window.location.hash.length > 0) {
      let hash = window.location.hash.split("#")[1];
      let activeIndex = 0;
      let itemIndex = 0;
      switch (hash) {
        case "watson-assistant-design":
          activeIndex = 0;
          itemIndex = 0;
          break;
        case "watson-assistant-development":
          activeIndex = 1;
          itemIndex = 1;
          break;
        case "channel-development":
          activeIndex = 1;
          itemIndex = 2;
          break;
        case "integration-development":
          activeIndex = 1;
          itemIndex = 3;
          break;
        case "solution-training":
          activeIndex = 1;
          itemIndex = 4;
          break;
        default:
          activeIndex = 0;
          itemIndex = 0;
          hash = "watson-assistant-design";
          break;
      }
      this.setState(
        {
          activeIndex,
          menuItems: Menu(
            assistantSubItems.slice(0, assistantSubItems.length),
            itemIndex
          ),
          linkId:
            hash === "watson-assistant-design" ||
            hash === "watson-assistant-development"
              ? "watson-assistant-id"
              : window.innerWidth >= 576
              ? hash + "-sm"
              : hash + "-xs"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link").click();
          }, 1000);
        }
      );
    }
  };

  handleChange = index => {
    this.setState({ activeIndex: index });
  };
  onSelect = key => {
    if (key === "0" || key === "1") {
      let activeIndex = Number(key);
      let menuItems = Menu(
        assistantSubItems.slice(0, assistantSubItems.length),
        Number(key)
      );
      let linkId;
      switch (Number(key)) {
        case 0:
          linkId = "watson-assistant-design";
          break;
        case 1:
          linkId = "watson-assistant-development";
          break;
        default:
          linkId = "watson-assistant-design";
          break;
      }
      this.setState(
        {
          activeIndex: activeIndex,
          menuItems: menuItems,
          linkId: "watson-assistant-id"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link").click();
            window.history.pushState(
              "",
              "",
              `/services/watson-assistant-services#${linkId}`
            );
          });
        }
      );
    } else {
      let activeIndex = 1;
      let menuItems = Menu(
        assistantSubItems.slice(0, assistantSubItems.length),
        Number(key)
      );
      let linkId;
      switch (Number(key)) {
        case 2:
          linkId = "channel-development";
          break;
        case 3:
          linkId = "integration-development";
          break;
        case 4:
          linkId = "solution-training";
          break;
        default:
          linkId = "channel-development";
          break;
      }

      this.setState(
        {
          activeIndex: activeIndex,
          menuItems: menuItems,
          linkId: window.innerWidth >= 576 ? linkId + "-sm" : linkId + "-xs"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link").click();
            window.history.pushState(
              "",
              "",
              `/services/watson-assistant-services#${linkId}`
            );
          }, 1000);
        }
      );
    }
  };
  render() {
    let menu = this.state.menuItems;
    return (
      <section className="services-content gap-y-half pb-0" id="3">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="content">
                <p id="watson-assistant-id" className="pt-2"></p>
                <h1 className="title text-primary text-uppercase">
                  <b>Watson Assistant Services</b>
                  <Link
                    id="custom-react-link"
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
                  <b>Watson Assistant</b>
                </h1>
                <p>
                  Incede has deep experience in helping organizations utilize
                  conversational AI for a competitive advantage in their product
                  and services strategies.
                </p>
              </div>
              <br />
              <div className="image-section">
                <img src={picture1} alt="support image" />
              </div>
              <br />
              <div className="content">
                <p>
                  Watson Assistant is IBM’s AI product that lets you build,
                  train, and deploy conversational interactions into any
                  application, device, or channel. Also known as chatbots or
                  virtual assistants, they are interactive software programs
                  powered by artificial intelligence to understand natural
                  language and simulate human conversations. They are
                  revolutionizing the way businesses engage with people in
                  customer service, IT service desk, employee self-service,
                  sales support, commerce and other application areas.
                </p>
              </div>
              <div className="content-outcomes">
                <h5>
                  <b className="color-grey">Outcomes</b>
                </h5>
                <ul>
                  <li>
                    <p>
                      Search for an answer from a knowledge base, know when to
                      ask for clarity and when to direct users to a human.
                    </p>
                  </li>
                  <li>
                    <p>
                      Extends investments by integrating with existing messaging
                      channels, voice channels, service desk and other systems.
                    </p>
                  </li>
                  <li>
                    <p>Deployed in any cloud or on-premises environment.</p>
                  </li>
                </ul>
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
                          Watson Assistant Design Services
                        </b>
                      </h4>

                      <div className="content">
                        <p>
                          The key to successful deployments is designing a
                          solution that is tailored to your needs while
                          delivering the user experience you intend. Incede
                          develops a phased Conversational AI Design for a
                          solution that meets your UX, technology and strategic
                          priorities while reducing risk and delivering the
                          necessary business value.
                        </p>
                        <p>
                          We assess points of contact between the users and the
                          organization and plot user reactions and behaviors to
                          various conditions, situations and interactions. We
                          identify triggers for managed interactions such as
                          escalations to a human agent or invoking a
                          transaction. We plan for how to train and maintain the
                          conversational AI model and when to incorporate
                          unplanned user requests.
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
                        <img src={picture2} alt="support image" />
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
                              Phased approach that delivers incremental business
                              value quickly.
                            </p>
                          </li>
                          <li>
                            <p>
                              Blueprints for the common integrations of people,
                              processes and AI.
                            </p>
                          </li>
                          <li>
                            <p>
                              Detailed plan of the resources needed to design,
                              develop, train and monitor the AI solution.
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
                          Watson Assistant Development Services
                        </b>
                      </h4>

                      <div className="content">
                        <p>
                          Incede provides experienced, high-quality, end-to-end
                          development capabilities required to create and deploy
                          conversational AI solutions.
                        </p>
                        <p>
                          Incede developers have created numerous solutions for
                          our own internal use and for customers. We have
                          developed patterns on which permutations of
                          frameworks, APIs, and plugins will work best for the
                          most common use cases.
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
                              Optimized relevancy training to improves users
                              trust in answers.
                            </p>
                          </li>
                          <li>
                            <p>
                              Best-practices based development for greater
                              sustainability.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      lg={5}
                      className="mt-4 mt-lg-0 d-flex align-items-center"
                    >
                      <div className="image-section mt-5">
                        <img src={picture3} alt="support image" />
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row className="my-5">
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
                          User Interface Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Accommodates user interactions via text and voice and
                          integrates capabilities such as translations and
                          channels.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Context Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p
                          id="integration-development-sm"
                          className="d-none d-sm-block"
                        ></p>
                        <p>
                          These are the implementation of the solution’s ability
                          to successfully match user inquiries with planned
                          intents. For those intents, this service will develop
                          supporting conversational dialogs of responses,
                          triggers and decision trees.
                        </p>
                        <p
                          id="integration-development-xs"
                          className="d-sm-none pt-3"
                        ></p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Integration Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Expands available context through back-end systems for
                          security, data or enterprise AI search of knowledge
                          bases using Watson Discovery.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Pre-Processing Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p
                          id="channel-development-sm"
                          className="d-none d-sm-block"
                        ></p>
                        <p>
                          Minimizes false negatives and false positives with a
                          pre-processing pipeline to handle common errors with
                          dependency parsing, lemmatization and parts of speech
                          checking.
                        </p>
                        <p
                          id="channel-development-xs"
                          className="d-sm-none pt-3"
                        ></p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Channel Development Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Integrate multi-channel deployments on mobile and web
                          with integrations to Facebook, Slack, Alexa, Google
                          Assistant, Siri, WhatsApp and third-party enterprise
                          chatbot solutions.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Exception Handling Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p
                          id="solution-training-sm"
                          className="d-none d-sm-block"
                        ></p>
                        <p>
                          Identifies and models outliners and escalations to
                          ensure the routing of requests that are not understood
                          or poorly understood.
                        </p>
                        <p
                          id="solution-training-xs"
                          className="d-sm-none pt-3"
                        ></p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">Solution Training Services</b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Applies initial and re-training of the solution to
                          parse, identify languages and various categories such
                          as intents, actions, entities and the context around
                          which responses will be framed and improved.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">Deployment Services</b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          Deploy solutions on either cloud or on-premise and
                          utilize microservices and REST-based architectures for
                          minimal downtime.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} className="py-2">
                      <h4 className="mb-0">
                        <b className="color-grey">
                          Post-Production Support Services
                        </b>
                      </h4>
                      <div className="content py-3 p-sm-0">
                        <p>
                          These are ongoing support and monitoring for live
                          services, including ongoing optimization of the
                          solution.
                        </p>
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

export default WatsonAssistant;
