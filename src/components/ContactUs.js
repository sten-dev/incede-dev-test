import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import ContactUs from "../components/Landing/ContactUs";
import { Container, Row, Col, FormGroup, Input, Form, Button } from 'reactstrap';
import "../styles/contact-us.scss"
class ContactUsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactInfo: {
                name: "",
                email: "",
                subject: "",
                message: ""
            }
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.contactInfo);
    }
    handleOnChange = (event) => {
        let eve = { ...event };
        this.setState(prevState => ({
            contactInfo: {
                ...prevState.contactInfo,
                [eve.target.name]: eve.target.value
            }
        }))
    }
    render() {
        const { location } = this.props;
        return (
            <React.Fragment>
                <ContactUs location={location} />
                <section className="header-section gap-y-half">
                    <Container>
                        <Row>
                            <Col xs="12" sm="12" md="6" lg="6">
                                <h1 className="got-any-questions">Got any questions? </h1>
                                <br />
                                <br />
                                <br />
                            </Col>
                            <Col xs="12" sm="12" md="6" lg="6">
                                <div className="enquiry-form">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h3>Enquiry Form</h3>
                                        <br />
                                        <FormGroup>
                                            <Input onChange={this.handleOnChange} className="mat-input" type="text" name="name" placeholder="Name" required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input onChange={this.handleOnChange} className="mat-input" type="email" name="email" placeholder="Email" required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input onChange={this.handleOnChange} className="mat-input" type="text" name="subject" placeholder="Subject" required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input onChange={this.handleOnChange} className="mat-input" type="textarea" name="message" placeholder="Message" />
                                        </FormGroup>
                                        <Button className="btn btn-primary" type="submit">Submit</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        )
    }
}

ContactUsPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
    query ContactUsPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            location {
              title
              subTitle
              phone
              email
              address
            }
          }
        }
      }
    `}
        render={(data) => <ContactUsPage location={data.markdownRemark.frontmatter.location} />}
    />
)
