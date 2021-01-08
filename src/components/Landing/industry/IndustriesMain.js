import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby';
import { Container, Row, Col } from 'reactstrap';
import WhatToDoListCard from '../../WhatToDoListCard';

class IndustriesMain extends React.Component {
  render() {
    const { data } = this.props
    const { edges: industries } = data.allMarkdownRemark
    console.log("industries list", industries)
    return (
      <section className="wtd-list ">
        <section className="header-section gap-y text-center">
          <Container>
            <Row>
              <Col>
                <h1>Industries</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          {industries.map((x, i) => {
            let industry = x.node.frontmatter;
            return (
              <WhatToDoListCard image={industry.image} key={i} title={industry.title} subTitle={industry.subTitle} excerpt={x.node.excerpt} slug={x.node.fields.slug} />
            );
          })}
        </Container>
      </section>
    )
  }
}

IndustriesMain.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query IndustriesMainQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "industries" } } }
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
    render={(data) => <IndustriesMain data={data} />}
  />
)
