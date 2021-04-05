import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

const JobList = (props) => {
  console.log('Received props:');
  console.log(props);
  const jobList = [];

  for (let i = 0; i < props.JobList.length; i += 1) {
    const job = props.JobList[i];

    jobList.push(
      <li>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={job.logo}
            alt="Generic placeholder"
          />
          <Media.Body>
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
          </Media.Body>
        </Media>
      </li>
    );
  }

  return (
    <ul className="job-list">
      {jobList}
    </ul>
  );
};

JobList.propTypes = {
  JobList: PropTypes.string.isRequired
};

export default JobList;
