import React from 'react';
import PropTypes from 'prop-types';
import {
  Media,
  Row,
  Col,
  Button
} from 'react-bootstrap';

const JobList = (props) => {
  const jobList = [];

  for (let i = 0; i < props.JobList.length; i += 1) {
    const job = props.JobList[i];

    jobList.push(
      <li>
        <Media>
          <img
            width={60}
            height={50}
            className="align-self-center company-logo"
            src={job.logo}
            alt="Generic placeholder"
          />
          <Media.Body>
            <Row>
              <Col>
                <span className="job-title">{job.position}</span>
                <br />
                <span>
                  {`${job.company}&nbsp;|&nbsp;${job.location}&nbsp;|&nbsp;${job.experience}`}
                </span>
                <br />
                <span>
                  <strong>Skills:</strong>
                  &nbsp;
                  {job.skills}
                </span>
              </Col>
              <Col xs="3" sm="3" md="2" lg="2" className="align-self-center">
                <Button>Apply</Button>
              </Col>
            </Row>
          </Media.Body>
        </Media>
      </li>
    );
  }

  return <ul className="job-list">{jobList}</ul>;
};

JobList.propTypes = {
  JobList: PropTypes.string.isRequired,
};

export default JobList;
