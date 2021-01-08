import React from "react";
import { Link } from "gatsby";
import arrow from "../../img/arrow.svg";
import { Container, Row, Col } from "reactstrap";

const ServicesSmallCardBody = ({ data, path }) => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} className="lg-border-right">
            <h3 className="mt-0">{data.title}</h3>
            <p>{data.mainContext}</p>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h4 className="mt-4 mt-md-0">Outcomes</h4>
            <ul>
              {data.sideContext.split(".").map((ele, i) => {
                if (ele !== "") {
                  return (
                    <li key={i}>
                      <p>{ele}</p>
                    </li>
                  );
                }
              })}
            </ul>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Link to={path} className="btn btn-secondary btn-lg">
              Know more &nbsp;
              <img src={arrow} alt="next" style={{ width: "12px" }} />
            </Link>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default ServicesSmallCardBody;
