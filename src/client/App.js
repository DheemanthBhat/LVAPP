import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import './app.css';
import NavBar from './components/NavBar';
import JobList from './components/JobList';
import Filter from './components/Filter';
import Communicator from './components/backend_communicator';
import URLS from './config';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };

    this.backendCommunicator = new Communicator();
  }

  componentDidMount() {
    this.backendCommunicator.getData(URLS.JOB_LIST_URL, undefined, (data) => {
      this.setState({ jobs: data.jobs });
    });
  }

  render() {
    const { jobs } = this.state;

    return (
      <Container>
        <NavBar />
        <Filter updateJobs={filteredJobs => this.setState({ jobs: filteredJobs })} />
        <JobList jobList={jobs} />
      </Container>
    );
  }
}
