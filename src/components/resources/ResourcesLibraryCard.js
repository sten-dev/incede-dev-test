import React, { useState } from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardImg from "reactstrap/lib/CardImg";
import CardTitle from "reactstrap/lib/CardTitle";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import moment from "moment";

const ResourcesLibraryCard = ({
  title,
  image,
  videoUrl,
  eventType,
  type,
  eventDate,
  timeZone,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let videoId = videoUrl?.split("v=")[1];
  let ampersandPosition = videoId?.indexOf("&");
  if (ampersandPosition != -1) {
    videoId = videoId?.substring(0, ampersandPosition);
  }

  return (
    <React.Fragment>
      <Card>
        {type === "events" && (
          <div className="events-type-content">
            <p className="events-type">{eventType}</p>
          </div>
        )}
        {type === "library" && (
          <span className="card-label">{videoUrl ? "Video" : "Image"}</span>
        )}
        <div
          className={videoUrl ? "pointer" : ""}
          onClick={videoUrl ? toggle : ""}
        >
          {videoUrl ? (
            <CardImg
              top
              width="100%"
              height={type === "events" ? "220px" : "300px"}
              src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            />
          ) : (
            <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: "resources",
                style: { height: type === "events" ? 220 : 300 },
              }}
            />
          )}
          {videoUrl && (
            <div
              className={
                type === "library" ? "play-icon-library" : "play-icon-events"
              }
            >
              <svg
                style={{ width: 45, height: 45, color: "#fff" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
                />
              </svg>
            </div>
          )}
        </div>

        {type === "library" && (
          <CardBody>
            <p className="resource-card-title">
              {/* <a className="pointer" onClick={toggle}> */}
              {title}
              {/* </a> */}
            </p>
          </CardBody>
        )}
        {type === "events" && (
          <CardBody>
            <p className="event-date">
              {moment(eventDate).format("LL") +
                " | " +
                moment(eventDate).format("LT") +
                " " +
                timeZone}
            </p>
          </CardBody>
        )}
      </Card>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        size="lg"
        className="m-auto"
      >
        <ModalHeader toggle={toggle} className="custom-modal-header">
          {title}
        </ModalHeader>
        <ModalBody>
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            style={{ width: "100%", height: "400px" }}
            allowFullScreen
          ></iframe>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ResourcesLibraryCard;
