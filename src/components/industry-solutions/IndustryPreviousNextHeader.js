import React from 'react';
import { Link } from 'gatsby';
import arrow from "../../img/arrow.svg";
const IndustryPreviousNextHeader = (props) => {
    return (
        <React.Fragment>
            <br />
            <div className="d-flex flex-wrap justify-content-between">
                <div>
                    {props.previousLink && (
                        <Link
                            to={props.previousLink}
                            className="btn  industry-previous-btn btn-primary btn-sm"
                        >
                            <img
                                src={arrow}
                                alt="next"
                                style={{ height: 12, marginTop: -1, marginRight: 8, transform: "rotate(180deg)" }}
                            />
                            {props.previousName || 'Previous'}
                        </Link>
                    )}

                </div>
                <div>
                    {props.nextLink && (
                        <Link
                            to={props.nextLink}
                            className="btn  industry-next-btn btn-primary btn-sm"
                        >
                            {props.nextName || 'Next'}
                            <img
                                src={arrow}
                                alt="next"
                                style={{ height: 12, marginTop: -1, marginLeft: 8 }}
                            />
                        </Link>
                    )}
                </div>
            </div>
            {/* <br /> */}
        </React.Fragment>
    );
}

export default IndustryPreviousNextHeader;