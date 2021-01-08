import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "gatsby";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import "../../styles/case-study-page.scss";
import arrow from "../../img/arrow.svg";
class CaseStudyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, description, image, slug, type } = this.props;
    let desLen = description.length;
    return (
      <React.Fragment>
        <Card>
          <div className="card-img">
            <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: `case study`,
              }}
            />
          </div>
          <CardBody style={{ color: "black" }}>
            <CardTitle className={type ? "cardTitle" : ""}>{title}</CardTitle>

            <CardText>
              {desLen > 150 ? description.substr(0, 150) + ".." : description}
            </CardText>
            <br />
            <div className="text-right">
              <Link to={slug} className="btn btn-primary">
                View &nbsp;
                <img
                  src={arrow}
                  height="16px"
                  alt="next"
                  // style={{ width: "12px", }}
                />
              </Link>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default CaseStudyCard;
