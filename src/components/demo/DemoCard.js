import * as React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

class DemoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Card className="demo-card">
          <CardBody>
            <CardTitle className='mb-0'> {this.props.data.NAME} </CardTitle>
            <p className='m-0 text-black-50'>{this.props.data.DESCRIPTION}</p>
            <br />
            <div>
              <Button
                outline
                size='sm'
                color='danger'
                onClick={() => {
                  this.props.onDelete(this.props.data.ID, this.props.index);
                }}>
                Delete
              </Button>
              &nbsp;&nbsp;
              <a
                className='btn btn-sm btn-outline-secondary text-decoration-none custom-anchor-button'
                href={`/demos/custom-demo/?demoId=${this.props.data.ID}`}
                target='_blank'
                rel='noopener noreferrer'>
                Launch Demo
              </a>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default DemoCard;
