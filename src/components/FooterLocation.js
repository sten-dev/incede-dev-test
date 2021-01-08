import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";

class FooterLocation extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <ul className="list-unstyled">
        <li className="mb-0">
          <h6>
            <b>Contact Us</b>
          </h6>
        </li>

        <li className="mb-0">
          <p>
            {location.phone}, {location.email}
          </p>
        </li>
        <li>
          <address>{location.address}</address>
        </li>
        <li>
          <Link className="navbar-item" to="/about/cookie-policy">
            Cookie Policy
                          </Link>
        </li>
      </ul>
    );
  }
}

FooterLocation.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query FooterLocationTemplate {
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
    render={data => (
      <FooterLocation location={data.markdownRemark.frontmatter.location} />
    )}
  />
);
