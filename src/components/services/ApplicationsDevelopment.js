import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ServicesSmallCardsList from "./ServicesSmallCardsList";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link } from "react-scroll";
import UIUXDesignServices from "./applications-development/ui-ux-design-service";
import MobileApplications from "./applications-development/MobileApplications";
import WebApplications from "./applications-development/WebApplications";

const subItems = [
    {
        image: "/img/watson-application-development/ux.svg",
        inactiveImage: "/img/watson-application-development/ux-inactive.svg",
        title: "UI/UX Design Services"
    },
    {
        image: "/img/watson-application-development/mobile-applications.svg",
        inactiveImage: "/img/watson-application-development/mobile-applications-inactive.svg",
        title: "Mobile Applications"
    },
    {
        image: "/img/watson-application-development/web-applications.svg",
        inactiveImage: "/img/watson-application-development/web-applications-inactive.svg",
        title: "Web Applications"
    },

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
class ApplicationsDevelopment extends Component {
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
                case "ui-ux-design-services":
                    activeIndex = 0;
                    break;
                case "mobile-applications":
                    activeIndex = 1;
                    break;
                case "web-applications":
                    activeIndex = 2;
                    break;
                // case "e-commerce-development":
                //     activeIndex = 3;
                //     break;
                // case "mobile-backend-development":
                //     activeIndex = 4;
                //     break;
                // case "enterprise-application-development":
                //     activeIndex = 5;
                //     break;
                default:
                    activeIndex = 0;
                    hash = "ui-ux-design-services";
                    break;
            }
            this.setState(
                {
                    activeIndex,
                    menuItems: Menu(
                        subItems.slice(0, subItems.length),
                        activeIndex
                    ),
                    linkId: "applications-development"
                },
                () => {
                    setTimeout(() => {
                        document.getElementById("custom-react-link-applications-development").click();
                    }, 500);
                }
            );
        }
    };

    onSelect = key => {
        let linkId;
        switch (Number(key)) {
            case 0:
                linkId = "ui-ux-design-services";
                break;
            case 1:
                linkId = "mobile-applications";
                break;
            case 2:
                linkId = "web-applications";
                break;
            // case 3:
            //     linkId = "e-commerce-development";
            //     break;
            // case 4:
            //     linkId = "mobile-backend-development";
            //     break;
            // case 5:
            //     linkId = "enterprise-application-development";
            //     break;
            default:
                linkId = "ui-ux-design-services";
                break;
        }
        this.setState(
            {
                activeIndex: Number(key),
                menuItems: Menu(subItems.slice(0, subItems.length), Number(key)),
                linkId: "applications-development"
            },
            () => {
                setTimeout(() => {
                    document.getElementById("custom-react-link-applications-development").click();
                    window.history.pushState("", "", `/services/applications-development#${linkId}`);
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
                            <div className="content">
                                <h1 className="title mb-0 text-primary text-uppercase">
                                    <b>Applications Development</b>
                                    <Link
                                        id="custom-react-link-applications-development"
                                        to={this.state.linkId}
                                        className="d-none"
                                        smooth={true}
                                    />
                                    <p id="applications-development" className="pt-1"></p>
                                </h1>
                                <p>
                                    When competitive advantage requires custom applications, Incede has the expertise and specializes in mobile and web app development. We can help in developing innovative cloud-based applications that are user-centric and outcome oriented across industries.
                                 </p>
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
                </Container>
                <Container
                    fluid
                    style={{ background: "rgba(122, 121, 121, 0.06)" }}
                    className="gap-y"
                >
                    <Row>
                        <Col xs={12}>
                            {this.state.activeIndex === 0 && <UIUXDesignServices />}
                            {this.state.activeIndex === 1 && <MobileApplications />}
                            {this.state.activeIndex === 2 && <WebApplications />}
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default ApplicationsDevelopment;
