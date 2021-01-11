import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { Link } from 'gatsby';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import '../../styles/case-study-page.scss';
import arrow from '../../img/arrow.svg';

const CampaignsCard = props => {
  const { campaign } = props;
  return (
    <React.Fragment>
      <Card>
        {/* <div className="card-img">
                    <PreviewCompatibleImage
                        imageInfo={{
                            image: campaign.IMAGE_URL,
                            alt: `campaign`
                        }}
                    />
                </div> */}
        <CardBody style={{ color: 'black' }}>
          <CardTitle>{campaign.TITLE}</CardTitle>
          {/* <CardText>
            {campaign.SUB_TITLE.length > 150
              ? campaign.SUB_TITLE.substr(0, 150) + '..'
              : campaign.SUB_TITLE}
          </CardText> */}
          <br />
          <div className='text-right'>
            <Link
              to={`/campaigns/view-campaign?campaignId=${campaign.ID}`}
              className='btn btn-primary'>
              View &nbsp;
              <img src={arrow} height='16px' alt='next' />
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CampaignsCard;
