import React from 'react';
import arrow from "../img/arrow.svg";
import { Row, Col, Card, CardBody, CardText } from 'reactstrap';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Link } from 'gatsby';
import "../styles/what-to-do-list.scss";
const WhatToDoListCard = (props) => {
    return (
        <Row className="wtd-card" >
            <Col>
                <Card>
                    <CardBody className="p-0">
                        <Row>
                            <Col lg={2} md={2} sm={4} xs={12}>
                                <div className="image-section">
                                    <PreviewCompatibleImage
                                        imageInfo={{
                                            image: props.image,
                                            alt: `thumbnail`,
                                            style: { width: "100%" }
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg={10} md={10} sm={8} xs={12} className="card-container">
                                <h5 className="mt-0">{props.title}</h5>
                                <h6 className="mt-0">{props.subTitle}</h6>
                                <CardText>
                                    {props.excerpt}
                                </CardText>
                                <br />
                                <div>
                                    <Link to={props.slug} className="btn btn-secondary btn-sm">
                                        Read More
                              {"  "}
                                        <img src={arrow} alt="next" style={{ width: "12px", height: "12px", marginTop: -2 }} />
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default WhatToDoListCard;