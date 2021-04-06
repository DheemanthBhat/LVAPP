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

  for (let i = 0; i < props.jobList.length; i += 1) {
    const job = props.jobList[i];

    jobList.push(
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
            <Col xs="12" sm="12" md="10" lg="10">
              <span className="job-title">{job.position}</span>
              <br />
              <span className="job-req">{`${job.company} | ${job.location} | ${job.experience}`}</span>
              <br />
              <strong>Skills:</strong>
              &nbsp;
              <span className="job-description">{job.skills}</span>
            </Col>
            <Col xs="12" sm="12" md="2" lg="2" className="align-self-center">
              <Button variant="primary">Apply</Button>
            </Col>
          </Row>
        </Media.Body>
      </Media>
    );
  }

  return <div>{jobList}</div>;
};

JobList.propTypes = {
  jobList: PropTypes.string.isRequired,
};

export default JobList;
