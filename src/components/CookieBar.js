import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "gatsby";
import closeImage from "../img/close-black.svg";

class CookieBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="cookie-bar-container">
          <div className="animate-bottom">
            <Container fluid>
              <Row className="d-flex align-items-center flex-column-reverse flex-sm-row">
                <Col xs={11} className="p-0 p-sm-3 pb-2">
                  <div className="body">
                    <p>
                      Welcome to Incede.ai! In order to provide a more relevant
                      experience for you, we utilize cookies. For more
                      information, please review our{" "}
                      <Link to="/about/cookie-policy">Cookies Policy</Link>
                      {/* {" "}and{" "}
                      <Link to="/about/privacy-policy">Privacy Policy</Link>. */}
                    </p>
                  </div>
                </Col>
                <Col className="col pt-2 p-sm-0 text-right text-sm-center">
                  <img
                    src={closeImage}
                    alt="close"
                    onClick={() => this.props.addCookie()}
                    className="close-icon pointer"
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CookieBar;
