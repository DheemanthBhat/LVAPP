import React, { Component } from 'react';
import './app.css';
import JobList from './components/JobList';

export default class App extends Component {
  state = {
    jobs: []
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/jobs')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ jobs: data.jobs });
      });
  }

  render() {
    const { jobs } = this.state;

    return (
      <div>
        <JobList JobList={jobs} />
      </div>
    );
  }
}
