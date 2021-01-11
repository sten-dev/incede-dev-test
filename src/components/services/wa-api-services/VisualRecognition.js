import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CaseStudyCard from "../../CaseStudyCard";
import AutoGlassImage from "../../../img/services/auto-glass-body-repair.png";
// import waVisualGeneral from "../../../img/wa-api/wa-visual-general.png"
// import waVisualInsurance from "../../../img/wa-api/wa-visual-insurance.png"
const VisualRecognition = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} xs={12} id="visual-recognition">
            <Row>
              <Col lg={7} md={12} sm={12} xs={12}>
                <h2 className="m-0">Visual Recognition</h2>
                <br />
                <p>
                  The IBM Watson Visual Recognition service is a powerful AI tool that identifies image Quickly and allows you to accurately tag, classify and search visual content using machine learning. The service comes with the following pretrained models; but can also be customized to recognize custom classes.
            </p>
                <br />
                <p>Incede experts create and train custom, highly accurate models that understand your image content.</p>
              </Col>
              <Col lg={5} md={12} sm={12} xs={12}>
                <CaseStudyCard
                  imageUrl={AutoGlassImage}
                  title="Auto Glass Case Study"
                  link="https://www.ibm.com/case-studies/autoglass-bodyrepair"
                  viewClass="pl-4"
                >
                  <ul className="my-3">
                    <li>Generating repair quotes 70% faster</li>
                    <li>Allows employees to focus on more complex claims</li>
                    <li>AI analysis to determine repair costs</li>
                  </ul>
                </CaseStudyCard>
              </Col>
            </Row>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <br />
            <p>
              The Visual Recognition services comes with out-of-box trained general model that understand objects, actions, scenes, and colors within an image. The service is also pre-trained to understand food data set, analyze any inappropriate content and extract text from a picture.
            </p>
            <br />
            {/* <ul className="mt-2">
              <li>
                <strong>General:</strong>A trained model that lets you use an active and large data set to gain insights from your own pictures. Understand objects, actions, scenes, and colors within an image.
                <div class="image-section my-3">
                  <img src={waVisualGeneral} alt="support image" />
                </div>
              </li>
              <li>
                <strong>Food:</strong> Similar to the general model, but this model uses a specific food data set. You can use the model to find any type of food, and one of the main applications is in the catering and restaurant industry, especially if you want to create a specific menu.
              </li>
              <li>
                <strong>Explicit:</strong> Allows you to analyze whether an image contains inappropriate content.
              </li>
              <li>
                <strong>Text:</strong> Allows you to extract text from a picture and have a textual metadata. This option is currently in private beta, but you can sign up for it.
              </li>
              <li>
                <strong>Custom:</strong> Lets you create a custom model with your own pictures and train it to get better results.
              </li>
            </ul> */}

            <p>The Visual Recognition service can be used for diverse applications and industries, such as:</p>
            <br />
            <strong>Manufacturing:</strong>
            <p>
              Use images from a manufacturing setting to make sure products are being positioned correctly on an assembly line
            </p>
            <br />
            <strong>Visual auditing:</strong>
            <p>
              Look for visual compliance or deterioration in a fleet of trucks, planes, or windmills out in the field, train custom models to understand what defects look like
            </p>
            <br />
            <strong>Insurance:</strong>
            <p>
              Rapidly process claims by using images to classify claims into different categories
            </p>
            {/* <ul className="mt-2">
              <li>
                <strong>Manufacturing:</strong> Use images from a manufacturing setting to make sure products are being positioned correctly on an assembly line
            </li>
              <li>
                <strong>Visual auditing:</strong> Look for visual compliance or deterioration in a fleet of trucks, planes, or windmills out in the field, train custom models to understand what defects look like
            </li>
              <li>
                <strong>Insurance:</strong> Rapidly process claims by using images to classify claims into different categories
                <div class="image-section my-3">
                  <img src={waVisualInsurance} alt="support image" />
                </div>
              </li>
            </ul> */}
          </Col>
          {/* <Col lg={6} md={6} sm={12}>
            
          </Col> */}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default VisualRecognition;
