import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { Container, Row, Col } from 'reactstrap';
import WhatToDoListCard from '../WhatToDoListCard';
import "../../styles/what-to-do-list.scss";
class SolutionsMain extends React.Component {
  render() {
    const { data } = this.props
    const { edges: solutions } = data.allMarkdownRemark
    console.log("solutions list", solutions)
    return (
      <section className="wtd-list ">
        <section className="header-section gap-y text-center">
          <Container>
            <Row>
              <Col>
                <h1>Solutions</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          {solutions.map((x, i) => {
            let solution = x.node.frontmatter;
            return (
              <WhatToDoListCard image={solution.image} key={i} title={solution.title} subTitle={solution.subTitle} excerpt={x.node.excerpt} slug={x.node.fields.slug} />
            );
          })}
        </Container>
      </section>
    )
  }
}

SolutionsMain.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query SolutionsMainQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "solutions-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
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
    render={(data) => <SolutionsMain data={data} />}
  />
)
