import React from 'react'
import Layout from '../components/Layout'
import { Card, CardBody, Row, Col } from 'reactstrap';
import arrow from "../img/arrow.svg"
import { Link } from 'gatsby';
import "../styles/404.scss"
const NotFoundPage = () => (
  <Layout pageTitle="404 | Incede">
    <Row className="gap-y-half d-flex justify-content-center text-center page-404 m-0">
      <Col lg={3} md={5} sm={10} xs={12}>
        <Card>
          <CardBody>
            <h1>
              <span role="img" aria-label="404 page">😮</span></h1>
            <h3>404</h3>
            <h6>Page Not Found</h6>
            <br />
            <Link to="/" className="btn btn-secondary btn-sm">
              Home {"  "}
              <img src={arrow} alt="next" style={{ width: "12px", height: "12px", marginTop: -2 }} />
            </Link>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Layout>
)

export default NotFoundPage
