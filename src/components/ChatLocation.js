import React from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';
import location from "../img/location.png"
const ChatLocation = () => {
    return (
        <div className="chat-location">
            <a rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=37.406306,-121.976493`} target="_blank">
                <Card>
                    <CardImg top width="100%" src={location} alt="Card image cap" />
                    <CardBody>
                        <h6 className="m-0">
                            <strong>Incede</strong>
                        </h6>
                        <p>
                            5201 Great America Pkwy #320 Santa Clara, CA 95054
                    </p>
                    </CardBody>
                </Card>
            </a>
        </div>
    );
}

export default ChatLocation;