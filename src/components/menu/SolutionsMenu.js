import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";
import { ListGroup } from "reactstrap";
class SolutionsMenu extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: solutionsList } = data.allMarkdownRemark;
    console.log(solutionsList);
    return (
      <section className="menu">
        <ListGroup>
          {solutionsList.map((s, i) => {
            let solution = s.node;

            return (
              <h6 key={i} className="mt-2">
                <Link to={solution.fields.slug}>
                  {solution.frontmatter.title}
                </Link>
              </h6>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}

SolutionsMenu.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query SolutionsMenuQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "solutions-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
              }
            }
          }
        }
      }
    `}
    render={data => <SolutionsMenu data={data} />}
  />
);
