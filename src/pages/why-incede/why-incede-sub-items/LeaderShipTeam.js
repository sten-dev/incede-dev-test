import React from "react";
import { Row, Col, Container } from "reactstrap";
import leadershipImg from "../../../img/why-incede/leadership.png";
import { Link } from "gatsby";
import arrowPrimary from "../../../img/arrow-primary.png";

const LeaderShipTeam = props => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            className="d-flex align-items-center"
          >
            <div>
              <h1 className="text-left heading">Trusted Leadership</h1>
              <h4 className="my-4">
                A team of experienced thought leaders who inspire innovation and
                commitment to customer success
              </h4>
              <p className="sub-title">
                Incede.ai is built ground-up by Locus Solutions, Inc.
                specializing in IBM Watson technology. For nearly 15 years,
                Locus Solutions has been an IBM Reseller Partner and worked with
                hundreds of customers. Incede.ai extends and propels the success
                of Locus Solutions with deep AI expertise in IBM Watson
                solutions.
              </p>
              <br />
              <p className="sub-title">
                With decades of management experience, innovation and business
                value are core to the leadership team’s ideals. They are trusted
                to think big and solve the most challenging business problems
                and do so by delivering value quickly and economically. Our
                management team has a shared passion for inspiring and
                empowering our team members to deliver success for and with our
                customers. Our team members are proven and experienced with a
                unique blend of business and technical expertise across a broad
                range of solution areas.
              </p>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={4}
            className="mt-4 mt-lg-0 d-flex align-items-center"
          >
            <div className="image-section">
              <img src={leadershipImg} alt="leadership team" />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default LeaderShipTeam;
