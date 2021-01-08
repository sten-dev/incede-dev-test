import React from "react";
import { Container, Col, Row } from "reactstrap";

const Customers = () => {
  return (
    <>
      <section className="customers-page">
        <section className="header-section gap-y">
          <Container>
            <Row>
              <Col>
                <h1>Customers</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          <Row>
            <Col>
              <main className="content gap-y">Images here</main>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Customers;
