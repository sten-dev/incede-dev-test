import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby';
import { Container, Row, Col } from 'reactstrap';
import "../../styles/what-to-do-list.scss";
import WhatToDoListCard from '../WhatToDoListCard';
class ServicesMain extends React.Component {
  render() {
    const { data } = this.props
    const { edges: services } = data.allMarkdownRemark
    console.log("services list", services);
    let newServicesList = [...services]
    if (newServicesList && newServicesList.length >= 3) {
      let zeroIndexObj = newServicesList[0];
      let secondIndexObj = newServicesList[2];
      newServicesList[0] = secondIndexObj;
      newServicesList[2] = zeroIndexObj;
    }
    return (
      <section className="wtd-list ">
        <section className="header-section gap-y text-center">
          <Container>
            <Row>
              <Col>
                <h1>Services</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          {newServicesList.map((x, i) => {
            let service = x.node.frontmatter;
            return (
              <WhatToDoListCard image={service.image} key={i} title={service.title} subTitle={service.subTitle} excerpt={x.node.excerpt} slug={x.node.fields.slug} />
            );
          })}
        </Container>
      </section>
    )
  }
}

ServicesMain.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ServicesMainQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "services" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                subTitle
                image {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <ServicesMain data={data} />}
  />
)
