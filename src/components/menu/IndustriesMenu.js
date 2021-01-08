import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";
import { ListGroup } from "reactstrap";
class IndustriesMenu extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: industriesList } = data.allMarkdownRemark;
    console.log("industries list", industriesList);
    return (
      <section className="menu">
        <ListGroup>
          {industriesList.map((s, i) => {
            let industry = s.node;

            return (
              <h6 key={i} className="mt-2">
                <Link to={industry.fields.slug}>
                  {industry.frontmatter.title}
                </Link>
              </h6>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}

IndustriesMenu.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query IndustriesMenuQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "industries" } } }
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
    render={data => <IndustriesMenu data={data} />}
  />
);
