import * as React from "react";
import "../../styles/campaign-banking.scss";
import AiImage from "../../img/incede-home-page-middle.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Popover,
  PopoverBody,
  Modal,
  ModalBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Link } from "gatsby";
import logo from "../../img/logo_white.png";
import campaignBakingImg from "../../img/campaign-banking/campaignBanking.png";
import AssetDetails_Image from "../../img/campaign-banking/AssetDetails_Image.png";
import arrow from "../../img/arrow.svg";
import Loading from "../common/Loading";
import { registerForWebinar } from "../../../Service";
import FooterLocation from "../FooterLocation";
import twitterPNG from "../../img/social/twitter.png";
import linkedInPNG from "../../img/social/linkedIn.png";
import whitePolygon from "../../img/webinar/polygon_watermark_white.svg";
import purplePolygon from "../../img/webinar/polygon_watermark_purple.svg";

// preview
import Forbes from "../../img/campaign-banking/pdf/preview/Forbes.png";
import HRB from "../../img/campaign-banking/pdf/preview/HRB.png";
import IBM from "../../img/campaign-banking/pdf/preview/IBM.png";
import IW from "../../img/campaign-banking/pdf/preview/IW.png";
import JD from "../../img/campaign-banking/pdf/preview/JD.png";

// pdf
import pdf1File from "../../img/campaign-banking/pdf/forbes.pdf";
import pdf2File from "../../img/campaign-banking/pdf/hbr.pdf";
import pdf3File from "../../img/campaign-banking/pdf/ibm.pdf";
import pdf4File from "../../img/campaign-banking/pdf/iw.pdf";
import pdf5File from "../../img/campaign-banking/pdf/jd.pdf";
import Label from "reactstrap/lib/Label";

const CampaignBanking = () => {
  const [register, setRegister] = React.useState({
    FIRST_NAME: "",
    LAST_NAME: "",
    COMPANY: "",
    JOB_TITLE: "",
    EMAIL: "",
    PHONE: "",
    TYPE: "banking",
    INDUSTRIES: [],
    MOST_USEFUL: [],
    SOLUTIONS: [],
    INDUSTRIES_OTHERS_TEXT: "",
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const handleOnChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };
  const handleCheckboxChange = (event) => {
    if (event.target.name === "INDUSTRIES") {
      let INDUSTRIES = [...register.INDUSTRIES];
      if (INDUSTRIES.includes(event.target.value)) {
        let index = INDUSTRIES.findIndex((i) => i === event.target.value);
        INDUSTRIES.splice(index, 1);
      } else {
        INDUSTRIES.push(event.target.value);
      }
      console.log("industries", INDUSTRIES);
      setRegister({ ...register, INDUSTRIES });
    } else if (event.target.name === "MOST_USEFUL") {
      let MOST_USEFUL = [...register.MOST_USEFUL];
      if (MOST_USEFUL.includes(event.target.value)) {
        let index = MOST_USEFUL.findIndex((m) => m === event.target.value);
        MOST_USEFUL.splice(index, 1);
      } else {
        MOST_USEFUL.push(event.target.value);
      }
      console.log("most-useful", MOST_USEFUL);
      setRegister({ ...register, MOST_USEFUL });
    } else {
      let SOLUTIONS = [...register.SOLUTIONS];
      if (SOLUTIONS.includes(event.target.value)) {
        let index = SOLUTIONS.findIndex((s) => s === event.target.value);
        SOLUTIONS.splice(index, 1);
      } else {
        SOLUTIONS.push(event.target.value);
      }
      console.log("solutions", SOLUTIONS);
      setRegister({ ...register, SOLUTIONS });
    }
  };
  const handleSubmit = async (event) => {
    // setLoading(true);
    event.preventDefault();

    let result;
    if (register.INDUSTRIES?.includes("Others")) {
      if (register.INDUSTRIES_OTHERS_TEXT === "") {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000);
      } else {
        let index = register.INDUSTRIES.findIndex((i) => i === "Others");
        register.INDUSTRIES.splice(index, 1);
        register.INDUSTRIES.push(register.INDUSTRIES_OTHERS_TEXT);
        setLoading(true);
        result = await registerForWebinar(register);
      }
    } else {
      setLoading(true);
      result = await registerForWebinar(register);
    }
    console.log("registerObj", register);
    // const result = await registerForWebinar(register);
    if (result && result.success) {
      setIsSubmitted(true);
    } else {
      // error
    }

    setLoading(false);
  };
  return (
    <div className="campaign-banking">
      {isLoading && <Loading />}
      <nav className="nav" id="header">
        <Container className="container-width">
          <Navbar expand="lg" light>
            <NavbarBrand>
              <Link to="/">
                <img className="incede-logo" src={logo} alt="incede" />
              </Link>
            </NavbarBrand>
          </Navbar>
        </Container>
      </nav>

      <div className="body1">
        <div className="position-relative">
          <img src={whitePolygon} alt="polygon" className="position-absolute" />
        </div>
        {/* <br />
        <br /> */}
        <Container className="container-width">
          <Row className="gap-y ">
            <Col sm="12" md="12" lg="6">
              <div className="title">Employee Self-Service</div>
              <div className="subtitle">
                People Do More in the new era of banking
              </div>

              {/* <h1>
                Title Text can be of 1-3 lines which will be displayed here
              </h1>
              <br />
              <h4 className='subtitle'>
                This is the subtitle text that will be displayed in a few lines
                so people will know what the page is about and why are they
                here.
              </h4> */}
            </Col>
            <Col className="text-right" sm="12" md="12" lg="6">
              <img
                src={campaignBakingImg}
                alt="campaignBanking"
                className="img"
              />
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <div className="body2">
        <Container className="custom-container container-width">
          <Row className="position-relative">
            {/* <Col className='gap-y left' sm='12' md='12' lg='6'>
              <div className='asset'>
                Success on Day 1, 37, 112, 423, 914, 1178...
              </div>
              <br />
              <br />
              <div className='custom-list'>
                <div className='subtitle'>
                  <div className='polygon'>
                    {' '}
                    <div />
                  </div>
                  <div>
                    When employees feel they are learning and growing in your
                    organization, you’ll be less likely to lose upwards of 60%
                    of your entire workforce within four years – Urban Bound
                  </div>
                </div>
                <br />
                <div className='subtitle'>
                  <div className='polygon'>
                    {' '}
                    <div />
                  </div>
                  <div>
                    Branch networks make 47% of banks' operating costs and 54%
                    of that branch expenditure goes to staffing – Diebold and
                    Forrester
                  </div>
                </div>
                <br />
                <div className='subtitle'>
                  <div className='polygon'>
                    {' '}
                    <div />
                  </div>
                  <div>
                    Nearly 33% of new hires look for a new job within their
                    first six months and it typically takes eight months for a
                    newly hired employee to reach full productivity – Harvard
                    Business Review
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div>
                <img
                  src={AssetDetails_Image}
                  alt='AssetDetails_Image'
                  className='img'
                />
              </div>
            </Col> */}
            <Col className="gap-y right" sm="12" md="12" lg="6">
              {isSubmitted ? (
                <div className="success">
                  <br />
                  <br />
                  <h2 className="">
                    You have successfully registered.{" "}
                    <span>Please click on links for more info.</span>
                  </h2>
                  <br />
                  {/* <br />
                  <h5>Learn More from the Incede Resource Center</h5> */}
                  <div className="pdf-container">
                    <div className="pdf-preview">
                      <a target="__blank" href={pdf1File} alt="pdf1File">
                        <img
                          width="191"
                          height="207"
                          // name='plugin'
                          src={Forbes}
                          // type='application/pdf'
                        />
                        <div className="pdf-ripple">PDF</div>
                      </a>
                    </div>
                    <div className="pdf-preview">
                      <a target="__blank" href={pdf2File} alt="pdf2File">
                        <img
                          width="191"
                          height="207"
                          // name='plugin'
                          src={HRB}
                          // type='application/pdf'
                        />
                      </a>
                      <div className="pdf-ripple">PDF</div>
                    </div>
                    <div className="pdf-preview">
                      <a target="__blank" href={pdf3File} alt="pdf3File">
                        <img
                          width="191"
                          height="207"
                          // name='plugin'
                          src={IBM}
                          // type='application/pdf'
                        />
                      </a>
                      <div className="pdf-ripple">PDF</div>
                    </div>
                    <div className="pdf-preview">
                      <a target="__blank" href={pdf4File} alt="pdf4File">
                        <img
                          width="191"
                          height="207"
                          // name='plugin'
                          src={IW}
                          // type='application/pdf'
                        />
                      </a>
                      <div className="pdf-ripple">PDF</div>
                    </div>
                    <div className="pdf-preview">
                      <a target="__blank" href={pdf5File} alt="pdf5File">
                        <img
                          width="191"
                          height="207"
                          // name='plugin'
                          src={JD}
                          // type='application/pdf'
                        />
                      </a>
                      <div className="pdf-ripple">PDF</div>
                    </div>
                  </div>

                  {/* <Link
                    className='custom-link'
                    to='https://livesend.ibm.com/i/OupOR4eFruvC3Pts2V0J74hJMIewHldbS4d5JbDi1pkNiFnuasQeGqcorwPLUSSIGNf5lfoWwVGk1PfMri3rDnKIp29___KQEzTsnRAaQtErYja3PLUSSIGNVl8EQUALSIGN'>
                    Forbes - How AI Can Help Your Employees
                  </Link>
                  <br />
                  <Link
                    className='custom-link'
                    to='https://livesend.ibm.com/i/OupOR4eFruvC3Pts2V0J74hJMIewHldbS4d5JbDi1pnxawWSqT0gHAFtMlo1GvxlLLYZVIGJFPHtp8dM9HeG16s32jSHTwboRW6Jsn7SYFIEQUALSIGN'>
                    HBR - HBR - Technology Can Save Onboarding from Itself
                  </Link>
                  <br />
                  <Link
                    className='custom-link'
                    to='https://livesend.ibm.com/i/OupOR4eFruvC3Pts2V0J74hJMIewHldbS4d5JbDi1pmaFwOfPLUSSIGNWXR6XY1ej7K3zSd9Hl7h3cTEsnxerd2iQm8xTyAGEgC20vJf8yueea3DlAEQUALSIGN'>
                    IBM - Vidahora Success Story
                  </Link>
                  <br />
                  <Link
                    className='custom-link'
                    to='https://livesend.ibm.com/i/OupOR4eFruvC3Pts2V0J74hJMIewHldbS4d5JbDi1plHbF5ht2024kVAQf2BB3vTitG9lpqUIqubnUHWP___NcMsjIXtweLpPfT3Ziwd23kykEQUALSIGN'>
                    IW - The Next Generation of Bank Branch Employees
                  </Link>
                  <br />
                  <Link
                    className='custom-link'
                    to='https://livesend.ibm.com/i/OupOR4eFruvC3Pts2V0J74hJMIewHldbS4d5JbDi1pmfzyQxSfxaEf9r2AGLlc09jDgPLUSSIGNgIBXWROk8iWdkNSHOyEzbYNZjSaP2DWouJAC4CMEQUALSIGN'>
                    J.D. Power - 2020 Customer Satisfaction with Retail Banking
                  </Link> */}
                </div>
              ) : (
                <div>
                  <Row className="reg-header">
                    <Col>
                      <div className="title">Register Now</div>
                    </Col>
                    <Col>
                      <div className="subtitle">*Required fields</div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <div className="register">
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="text"
                          name="FIRST_NAME"
                          placeholder="First Name *"
                          value={register.FIRST_NAME}
                          required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="text"
                          name="LAST_NAME"
                          placeholder="Last Name *"
                          value={register.LAST_NAME}
                          required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="text"
                          name="COMPANY"
                          value={register.COMPANY}
                          placeholder="Company *"
                          required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="text"
                          name="JOB_TITLE"
                          value={register.JOB_TITLE}
                          placeholder="Job Title *"
                          required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="email"
                          name="EMAIL"
                          value={register.EMAIL}
                          placeholder="Email Address *"
                          required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Input
                          onChange={handleOnChange}
                          className="contact-us-mat-input"
                          type="text"
                          name="PHONE"
                          value={register.PHONE}
                          placeholder="Phone Number"
                          // required
                        />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Label className="form-label">
                          What Industries are you interested in?
                        </Label>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Retail/Distribution"
                            />{" "}
                            Retail/Distribution
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Industrial/Manufacturing"
                            />{" "}
                            Industrial/Manufacturing
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Banking"
                            />{" "}
                            Banking
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Insurance"
                            />{" "}
                            Insurance
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Communications"
                            />{" "}
                            Communications
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Services"
                            />{" "}
                            Services
                          </Label>
                        </div>
                        <div className="form-checkbox display-flex">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="INDUSTRIES"
                              value="Others"
                            />{" "}
                            Others:
                          </Label>
                          <FormGroup className="others-text">
                            <Input
                              onChange={handleOnChange}
                              className="contact-us-mat-input mb-5"
                              type="text"
                              name="INDUSTRIES_OTHERS_TEXT"
                              value={register.INDUSTRIES_OTHERS_TEXT}
                              placeholder="write here..."
                              // required
                            />
                            {showErrorMessage && (
                              <span className="error-message">
                                Please fill out this field
                              </span>
                            )}
                          </FormGroup>
                        </div>
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Label className="form-label">
                          What would be most useful to you?
                        </Label>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="MOST_USEFUL"
                              value="Access to exclusive industry reports"
                            />{" "}
                            Access to exclusive industry reports
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="MOST_USEFUL"
                              value="Any upcoming promotions"
                            />{" "}
                            Any upcoming promotions
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="MOST_USEFUL"
                              value="Newest videos & demos"
                            />{" "}
                            Newest videos & demos
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="MOST_USEFUL"
                              value="Contact Me today"
                            />{" "}
                            Contact Me today
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="MOST_USEFUL"
                              value="Success Stories"
                            />{" "}
                            Success Stories
                          </Label>
                        </div>
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <Label className="form-label">
                          What Solutions/Solution offerings would you be
                          interested in?
                        </Label>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Watson Assistant"
                            />{" "}
                            Watson Assistant
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Watson Discovery"
                            />{" "}
                            Watson Discovery
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Watson API"
                            />{" "}
                            Watson API
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Customer Service"
                            />{" "}
                            Customer Service
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Human Resources"
                            />{" "}
                            Human Resources
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="IT service desk"
                            />{" "}
                            IT service desk
                          </Label>
                        </div>
                        <div className="form-checkbox">
                          <Label>
                            <Input
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              name="SOLUTIONS"
                              value="Sales Support Solutions"
                            />{" "}
                            Sales Support Solutions
                          </Label>
                        </div>
                      </FormGroup>
                      <br />
                      <div className="d-flex">
                        <Button className="btn btn-primary" type="submit">
                          Submit
                        </Button>
                      </div>
                      <br />
                      <div className="term-con">
                        I accept that by completing this form, I will be
                        subscribed to receive Incede.ai emails with insights and
                        information on upcoming events. I understand that I will
                        always have the option to unsubscribe from
                        communications.
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </Col>
            <img
              src={purplePolygon}
              alt="polygon"
              className="position-absolute bottom-polygon"
            />
          </Row>
        </Container>
        <br />
        <br />
        <br />
      </div>

      <div className="about">
        <Container className="container-width">
          <Row className="gap-y ">
            <Col sm="12" md="12" lg="6">
              <div className="title">ABOUT INCEDE</div>
              <br />
              <div className="subtitle">
                We use AI to solve complex business problems
              </div>
              <br />
              <div className="subtitle2">
                Incede personalizes user experiences, streamlines business
                processes and workflow and sparks innovation by deploying AI
                solutions.
              </div>
              <br />
              <div className="py-2">
                <Link to="/" className="btn btn-secondary btn-lg">
                  Explore More &nbsp;
                  <img src={arrow} alt="next" style={{ width: "12px" }} />
                </Link>
              </div>
            </Col>
            <Col className="d-none d-lg-block">
              <div className="image-section">
                <img src={AiImage} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <div className='footer'>
        <Container className='container-width'>
          <Row>
            <Col>
              <h4>📞 408-898-4606 &nbsp;&nbsp; ✉️ info@incede.in</h4>
            </Col>
            <Col>
              <h4 className='text-right'>© Copyright 2020 incede.ai</h4>
            </Col>
          </Row>
        </Container>
      </div> */}

      <footer className="footer gap-y-half">
        <Container className="container-width">
          <Row className="d-flex flex-column-reverse flex-md-row">
            <Col sm={12} md={12}>
              <Container fluid>
                <Row>
                  <Col className="incede-img" xs="12" md="12" sm="12" lg="12">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div>
                        <img src={logo} alt="incede.ai" />
                      </div>

                      <div>
                        <section className="social text-right">
                          <a
                            className="pl-0"
                            title="LinkedIn"
                            target="_blank"
                            href="https://www.linkedin.com/company/incede-ai"
                          >
                            <img
                              className="mr-16"
                              src={linkedInPNG}
                              alt="LinkedIn"
                            />
                          </a>
                          <a
                            title="twitter"
                            target="_blank"
                            href="https://twitter.com/incedeAI"
                          >
                            <img
                              className="fas fa-lg"
                              src={twitterPNG}
                              alt="Twitter"
                            />
                          </a>
                          <a
                            title="Youtube"
                            target="_blank"
                            href="https://www.youtube.com/channel/UCQwz5MBtdWHuqpoKpU21xRQ"
                          >
                            {/* <i class="fab fa-youtube"></i> */}
                            {/* <img src={youtubePNG} alt="youtube" /> */}

                            <svg
                              style={{ width: 42, height: 42 }}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ff0000"
                                d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
                              />
                            </svg>
                          </a>
                        </section>
                      </div>
                    </div>
                  </Col>

                  <Col md="4" sm="6" xs="12" className="py-2">
                    <section className="half-menu">
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/" className="navbar-item">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/why-incede">
                            Why Incede
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/why-incede">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </Col>
                  <Col md="4" sm="6" xs="12" className="py-2">
                    <section className="menu">
                      {/* <FooterLocation /> */}
                      <h4 className="mt-0 text-white">Contact Us</h4>
                      <p>United States, Headquaters</p>
                      <br />
                      <p>408-898-4606, info@incede.ai</p>
                      <br />
                      <p>
                        5201 Great America Parkway, Suite #320, Santa Clara, CA
                        95054
                      </p>
                    </section>
                  </Col>
                  {/* <Col lg='12' md='12' sm='12' xs='12'>
                    <p className='m-0'>© Copyright 2020 incede.ai</p>
                  </Col> */}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default CampaignBanking;
