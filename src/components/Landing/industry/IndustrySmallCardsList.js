import React from "react";
import PreviewCompatibleImage from "../../PreviewCompatibleImage";

const IndustrySmallCard = ({ industry, index, isActive, onItemClick }) => {
  return (
    <React.Fragment>
      <div
        className={`small-card-section pointer ${isActive ? "arrow_box" : ""} `}
        onClick={() => onItemClick(index)}
      >
        <div className="image-section">
          <PreviewCompatibleImage
            imageInfo={{
              image: isActive ? industry.image : industry.inactiveImage,
              alt: `featured image thumbnail`,
              style: { width: "100%" }
            }}
          />
        </div>
        <div className={`title ${isActive ? "active" : ""}`}>
          <span className={`text-center`}>{industry.title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IndustrySmallCard;
