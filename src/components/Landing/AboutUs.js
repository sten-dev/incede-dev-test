import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import arrow from '../../img/arrow.svg';
import '../../styles/about_us.scss';
import { Link } from 'gatsby';
class AboutUs extends React.Component {
  state = {};
  render() {
    const { about } = this.props;
    return (
      <section className='about'>
        <Container>
          <Row>
            <Col>
              <article className='gap-y-half text-center text-sm-left'>
                <h1 className='title'>{about.title}</h1>
                <h5 className='text-white sub-title'>{about.subTitle}</h5>
                <div className='py-2'>
                  <Link to='/about' className='btn btn-secondary btn-lg'>
                    {about.button}
                    <img
                      src={arrow}
                      alt='next'
                      // style={{ width: "12px", }}
                    />
                  </Link>
                </div>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default AboutUs;
