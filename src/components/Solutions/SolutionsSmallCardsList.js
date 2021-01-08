import React from "react";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const SolutionsSmallCard = ({ solution, index, isActive, onItemClick }) => {
  return (
    <React.Fragment>
      <div
        className={`small-card-section pointer ${isActive ? "arrow_box" : ""} `}
        onClick={() => onItemClick(index)}
      >
        <div className="image-section">
          <PreviewCompatibleImage
            imageInfo={{
              image: isActive ? solution.image : solution.inactiveImage,
              alt: `featured image thumbnail`,
              style: { width: "100%" }
            }}
          />
        </div>
        <div className={`title ${isActive ? "active" : ""}`}>
          <span className={`text-center`}>{solution.title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SolutionsSmallCard;
