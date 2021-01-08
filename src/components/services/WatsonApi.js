import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ServicesSmallCardsList from "./ServicesSmallCardsList";
import TextToSpeech from "./wa-api-services/TextToSpeech";
import SpeechToText from "./wa-api-services/SpeechToText";
import NaturalLanguageClassifier from "./wa-api-services/NaturalLanguageClassifier";
import PersonalityInsights from "./wa-api-services/PersonalityInsights";
import ToneAnalyzer from "./wa-api-services/ToneAnalyzer";
import VisualRecognition from "./wa-api-services/VisualRecognition";
import LanguageTranslator from "./wa-api-services/LanguageTranslator";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link, animateScroll as scroll } from "react-scroll";

const apiSubItems = [
  {
    image: "/img/watson-api/text-to-speech.png",
    inactiveImage: "/img/watson-api/text-to-speech-inactive.png",
    title: "Text to speech"
  },
  {
    image: "/img/watson-api/speech-to-text.png",
    inactiveImage: "/img/watson-api/speech-to-text-inactive.png",
    title: "Speech to Text"
  },
  {
    image: "/img/watson-api/language-translator.png",
    inactiveImage: "/img/watson-api/language-translator-inactive.png",
    title: "Language Translator"
  },
  {
    image: "/img/watson-api/natural-language-classifier.png",
    inactiveImage: "/img/watson-api/natural-language-classifier-inactive.png",
    title: "Natural Language Classifier"
  },
  {
    image: "/img/watson-api/personality-insights.png",
    inactiveImage: "/img/watson-api/personality-insights-inactive.png",
    title: "Personality Insights"
  },
  {
    image: "/img/watson-api/tone-analyzer.png",
    inactiveImage: "/img/watson-api/tone-analyzer-inactive.png",
    title: "Tone Analyzer"
  },
  {
    image: "/img/watson-api/visual-recognition.png",
    inactiveImage: "/img/watson-api/visual-recognition-inactive.png",
    title: "Visual Recognition"
  }
];

export const Menu = (apiSubItems, activeIndex) =>
  apiSubItems.map((x, i) => {
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
class WatsonApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      clickWhenDrag: false,
      alignCenter: false,
      dragging: true,
      hideArrows: false,
      hideSingleArrow: true,
      itemsCount: apiSubItems.length,
      scrollToSelected: false,
      selected: 0,
      translate: 0,
      transition: 0.3,
      wheel: false,
      menuItems: Menu(apiSubItems.slice(0, apiSubItems.length), 0),
      linkId: ""
    };
  }

  componentDidMount = () => {
    if (window.location.hash.length > 0) {
      let hash = window.location.hash.split("#")[1];
      let activeIndex = 0;
      switch (hash) {
        case "text-to-speech":
          activeIndex = 0;
          break;
        case "speech-to-text":
          activeIndex = 1;
          break;
        case "language-translator":
          activeIndex = 2;
          break;
        case "natural-language":
          activeIndex = 3;
          break;
        case "personality-insights":
          activeIndex = 4;
          break;
        case "tone-analyzer":
          activeIndex = 5;
          break;
        case "visual-recognition":
          activeIndex = 6;
          break;
        default:
          activeIndex = 0;
          hash = "text-to-speech";
          break;
      }
      this.setState(
        {
          activeIndex,
          menuItems: Menu(
            apiSubItems.slice(0, apiSubItems.length),
            activeIndex
          ),
          linkId: "watson-api-id"
        },
        () => {
          setTimeout(() => {
            document.getElementById("custom-react-link-watson-api").click();
          }, 500);
        }
      );
    }
  };

  onSelect = key => {
    let linkId;
    switch (Number(key)) {
      case 0:
        linkId = "text-to-speech";
        break;
      case 1:
        linkId = "speech-to-text";
        break;
      case 2:
        linkId = "language-translator";
        break;
      case 3:
        linkId = "natural-language";
        break;
      case 4:
        linkId = "personality-insights";
        break;
      case 5:
        linkId = "tone-analyzer";
        break;
      case 6:
        linkId = "visual-recognition";
        break;
      default:
        linkId = "text-to-speech";
        break;
    }
    this.setState(
      {
        activeIndex: Number(key),
        menuItems: Menu(apiSubItems.slice(0, apiSubItems.length), Number(key)),
        linkId: "watson-api-id"
      },
      () => {
        setTimeout(() => {
          document.getElementById("custom-react-link-watson-api").click();
          window.history.pushState("", "", `/services/watson-api#${linkId}`);
        });
      }
    );
  };
  handleChange = index => {
    this.setState({ activeIndex: index });
  };
  render() {
    let menu = this.state.menuItems;
    return (
      <section className="services-content gap-y-half pb-0" id="3">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="content pb-5">
                <h1 className="title text-primary text-uppercase">
                  <b>Watson API Services</b>
                </h1>
                <Link
                  id="custom-react-link-watson-api"
                  to={this.state.linkId}
                  className="d-none"
                  smooth={true}
                />
                <p>
                  <b className="text-grey">
                    When competitive advantage requires custom AI applications,
                    Incede has the expertise.
                  </b>
                </p>
                <p>
                  Incede infuses Watson AI capabilities into applications for a
                  deeper user experience and richer insights for
                  decision-makers. For example, Incede solutions could integrate
                  a conversational AI solution where a user provides a question
                  in any number of natural languages, including speech, and
                  shares a photo that is then evaluated and answered with the
                  context of the user’s order history, sentiment, inquiry and
                  specifics about their photo – in their preferred language,
                  including voice.
                </p>
                <p id="watson-api-id" className="pt-2"></p>
              </div>
            </Col>
          </Row>
          {/* <div className="wwd-list custom-services-img d-flex flex-nowrap">
            {apiSubItems.map((x, i) => {
              let data = x;
              return (
                <div key={i} className="wwd-list-card api-services-cards mb-0">
                  <ServicesSmallCardsList
                    service={data}
                    index={i}
                    isActive={this.state.activeIndex === i ? true : false}
                    onItemClick={index => this.handleChange(index)}
                  />
                </div>
              );
            })}
          </div> */}
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
          className="gap-y"
        >
          <Row>
            <Col xs={12}>
              {this.state.activeIndex === 0 && <TextToSpeech />}
              {this.state.activeIndex === 1 && <SpeechToText />}
              {this.state.activeIndex === 2 && <LanguageTranslator />}
              {this.state.activeIndex === 3 && <NaturalLanguageClassifier />}
              {this.state.activeIndex === 4 && <PersonalityInsights />}
              {this.state.activeIndex === 5 && <ToneAnalyzer />}
              {this.state.activeIndex === 6 && <VisualRecognition />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default WatsonApi;
