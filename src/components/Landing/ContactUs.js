import React from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import call from "../../img/call.svg";
import location_icon from "../../img/location.svg";
import mail from "../../img/mail.svg";
import contact_us from "../../img/contact-us-3.jpg";
import "../../styles/contact-us.scss";

const ContactUs = props => {
  let { location } = props;
  return (
    <section className="contact-us">
      <Container>
        <Row>
          <Col
          // lg={{ offset: 2, size: 8 }}
          // md={{ offset: 3, size: 6 }}
          // sm={{ offset: 1, size: 10 }}
          // xs={12}
          >
            <article className="gap-y">
              <h1 className="semi-bold text-primary text-center text-sm-left">
                Contact Us
              </h1>
              <br />
              <br className="d-block d-sm-none" />
              <div></div>
              <Card className="contact-us-card">
                <CardBody className="p-0 d-none d-sm-block">
                  <div className="d-flex">
                    <div>
                      <img
                        className="contact-card-img"
                        src={contact_us}
                        alt="contact"
                      />
                    </div>
                    <div className="p-4">
                      <ContactInfo location={location} />
                    </div>
                  </div>
                </CardBody>
                <CardBody className="p-0  d-block d-sm-none">
                  <div className="d-flex flex-column">
                    <div>
                      <img
                        className="d-block d-sm-none xs-image"
                        src={contact_us}
                        alt="contact"
                      />
                    </div>
                    <div className="p-4">
                      <ContactInfo location={location} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const ContactInfo = props => {
  let location = props.location;
  return (
    <React.Fragment>
      <h1 className="contact-title">{location.title}</h1>
      <h6 className="contact-subtitle semi-bold text-uppercase fs-16">
        {location.subTitle}
      </h6>
      <br />
      <div>
        <img src={call} alt="call" />
        <em>{location.phone}</em>
      </div>
      <br />
      <div>
        <p className="mb-0">
          <img src={mail} alt="mail" />
          {location.email}
        </p>
      </div>
      <br />
      <div className="d-flex">
        <img src={location_icon} alt="location" />
        <address className="mb-0">{location.address}</address>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
