import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";
import { ListGroup } from "reactstrap";
class ServicesMenu extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: servicesList } = data.allMarkdownRemark;
    console.log("services list", servicesList);
    let newServicesList = [...servicesList]
    if (newServicesList && newServicesList.length >= 3) {
      let zeroIndexObj = newServicesList[0];
      let secondIndexObj = newServicesList[2];
      newServicesList[0] = secondIndexObj;
      newServicesList[2] = zeroIndexObj;
    }
    return (
      <section className="menu">
        <ListGroup>
          {newServicesList.map((s, i) => {
            let service = s.node;

            return (
              <h6 key={i} className="mt-2">
                <Link to={service.fields.slug}>
                  {service.frontmatter.title}
                </Link>
              </h6>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}

ServicesMenu.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query ServicesMenuQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "services" } } }
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
    render={data => <ServicesMenu data={data} />}
  />
);
