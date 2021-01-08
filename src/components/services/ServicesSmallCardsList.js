import React from "react";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const ServicesSmallCard = ({ service, index, isActive, onItemClick }) => {
  return (
    <React.Fragment>
      <div
        className={`small-card-section pointer ${isActive ? "arrow_box" : ""} `}
        onClick={() => onItemClick(index)}
      >
        <div className="image-section">
          <PreviewCompatibleImage
            imageInfo={{
              image: isActive ? service.image : service.inactiveImage,
              alt: `featured image thumbnail`,
              style: { width: "100%" }
            }}
          />
        </div>
        <div className={`title ${isActive ? "active" : ""}`}>
          <span className={`text-center`}>{service.title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServicesSmallCard;
