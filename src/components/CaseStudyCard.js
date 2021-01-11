import React from "react";
const CaseStudyCard = props => {
  return (
    <div className={`woodside p-3 d-flex  flex-column ${props.noMarginTop ? '' : 'mt-5'}`}>
      <div className="d-flex flex-column flex-sm-row px-4 align-items-initial align-items-sm-center">
        <div className="d-flex justify-content-center align-items-center">
          <img className="case-study-img" src={props.imageUrl} alt="case study" />
        </div>
        <div className="pt-3 pt-sm-0">
          <p className="pp-1 pl-sm-3 pl-0 text-center text-sm-left">
            {props.title}
          </p>
        </div>
      </div>
      <div className="points-text">{props.children && props.children}</div>
      <div className="flex-grow-1 ml-3">
        <p
          className={`pp-3 text-center ${
            props.viewClass ? props.viewClass : ""
            }`}
        >
          <a
            href={props.link}
            target="_blank"
            className="case-study pointer bold"
            rel="noopener noreferrer"
          >
            View Case Study
          </a>
        </p>
      </div>
    </div>
  );
};

export default CaseStudyCard;
