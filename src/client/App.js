import React, { Component } from 'react';
import {
  FormControl,
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

import './app.css';
import JobList from './components/JobList';
import Communicator from './components/backend_communicator';
import URLS from './config';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      searchText: '',
      all: false,
      filter: [
        { id: 'full_time', value: false, text: 'Full Time' },
        { id: 'part_time', value: false, text: 'Part Time' },
        { id: 'free_lancer', value: false, text: 'Freelancer' }
      ],
      showAdvancedSearch: true
    };

    this.backendCommunicator = new Communicator();
  }

  componentDidMount() {
    this.backendCommunicator.getData(URLS.JOB_LIST_URL, undefined, (data) => {
      this.setState({ jobs: data.jobs });
    });
  }

  toggleAdvanceSearch = () => {
    const { showAdvancedSearch } = this.state;
    this.setState({ showAdvancedSearch: !showAdvancedSearch });
  }

  searchJobs = () => {
    const { searchText, all, filter } = this.state;

    const jobType = [];
    for (let i = 0; !all && i < filter.length; i += 1) {
      if (filter[i].value) {
        jobType.push(filter[i].text);
      }
    }

    const payload = {
      searchText,
      jobType
    };

    this.backendCommunicator.getData(URLS.JOB_LIST_URL, payload, (data) => {
      this.setState({ jobs: data.jobs });
    });
  }

  updateFilter = (e) => {
    const { filter } = this.state;

    if (e.target.id === 'all') {
      this.setState({ all: e.target.checked });
      return;
    }

    for (let i = 0; i < filter.length; i += 1) {
      if (filter[i].id === e.target.id) {
        filter[i].value = e.target.checked;
      }
    }

    this.setState({ filter });
  }

  render() {
    const { jobs, searchText, showAdvancedSearch } = this.state;

    return (
      <div className="app-container">
        <Container fluid>
          <Row className="c-m-b">
            <Col xs="12" sm="12" md="4" lg="3">
              <FormControl
                placeholder="Search By Keywords"
                aria-label="search"
                aria-describedby="basic-addon1"
                onChange={e => this.setState({ searchText: e.target.value })}
                value={searchText}
              />
            </Col>
            <Col>
              <Form onChange={this.updateFilter}>
                <Form.Check inline label="All" type="checkbox" id="all" />
                <Form.Check inline label="Full-Time" type="checkbox" id="full_time" />
                <Form.Check inline label="Part-Time" type="checkbox" id="part_time" />
                <Form.Check inline label="Freelancer" type="checkbox" id="free_lancer" />
                <Button variant="primary" onClick={this.searchJobs}>Search</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" sm="12" lg="12" className="c-m-b">
              <Button variant="link" onClick={this.toggleAdvanceSearch} className="link">
                Advanced Search
              </Button>
            </Col>
            <Col hidden={showAdvancedSearch} xs="12" md="12" sm="12" lg="12" className="c-m-b">
              <Row>
                <Col xs="12" sm="6" md="4" lg="3">
                  <FormControl
                    placeholder="Filter By Location"
                    aria-label="search"
                    aria-describedby="basic-addon2"
                  />
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                  <FormControl
                    placeholder="Filter By Experience"
                    aria-label="search"
                    aria-describedby="basic-addon3"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <JobList JobList={jobs} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
