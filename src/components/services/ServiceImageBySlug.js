import React, { Component } from 'react';
import service1 from "../../img/services/service-1.png"
import service2 from "../../img/services/service-2.png"
import service3 from "../../img/services/service-3.png"
class ServiceImageBySlug extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getServiceImageBySlug = () => {
        switch (this.props.slug) {
            case "virtual-assistance-chatbots":
                return <img className="service-img-slug" src={service1} alt="service-1" />
            case "2020-01-28-custom-ai-applications":
                return <img className="service-img-slug" src={service2} alt="service-2" />
            case "2020-01-28-cognitive-enterprise":
                return <img className="service-img-slug" src={service3} alt="service-3" />
            default:
                return <img className="service-img-slug" src={service1} alt="service-1" />
        }
    }
    render() {
        console.log("slug", this.props.slug);
        return (
            <React.Fragment>
                {this.props.slug && this.getServiceImageBySlug()}
            </React.Fragment>
        );
    }
}

export default ServiceImageBySlug;