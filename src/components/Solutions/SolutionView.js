import React from "react";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import { Card, CardBody } from "reactstrap";
import { Link } from "gatsby";

const SolutionView = ({ solution, path }) => {
  return (
    <Link to={path} className="no-color-decoration">
      <Card className="card-section">
        <div className="image-section">
          <PreviewCompatibleImage
            imageInfo={{
              image: solution.image,
              alt: `featured image thumbnail`,
              style: { width: "100%" }
            }}
          />
        </div>
        <CardBody className="text-center pt-0">
          <h4>{solution.title}</h4>
          <h6 className="subTitle">{solution.subTitle}</h6>
          {/* <HTMLContent content={html}></HTMLContent> */}
        </CardBody>
      </Card>
    </Link>
  );
};

export default SolutionView;
