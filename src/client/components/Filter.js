import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Form,
  FormControl
} from 'react-bootstrap';

import URLS from '../config';
import Communicator from './backend_communicator';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      all: false,
      filter: [
        { id: 'full_time', value: false, text: 'Full Time' },
        { id: 'part_time', value: false, text: 'Part Time' },
        { id: 'free_lancer', value: false, text: 'Freelancer' }
      ],
      locationText: '',
      experience: '',
      showAdvancedSearch: true
    };

    this.backendCommunicator = new Communicator();
  }

  toggleAdvanceSearch = () => {
    const { showAdvancedSearch } = this.state;
    this.setState({ showAdvancedSearch: !showAdvancedSearch });
  }

  searchJobs = () => {
    const {
      searchText,
      all,
      filter,
      locationText,
      experience
    } = this.state;

    const { updateJobs } = this.props;
    const jobType = [];
    for (let i = 0; !all && i < filter.length; i += 1) {
      if (filter[i].value) {
        jobType.push(filter[i].text);
      }
    }

    const payload = {
      searchText,
      jobType,
      locationText,
      experience
    };

    this.backendCommunicator.getData(URLS.JOB_LIST_URL, payload, (data) => {
      updateJobs(data.jobs);
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
    const {
      searchText,
      showAdvancedSearch,
      locationText,
      experience
    } = this.state;

    return (
      <React.Fragment>
        <Row className="mb-2">
          <Col xs="12" sm="12" md="4" lg="3">
            <FormControl
              placeholder="Search By Keywords"
              aria-label="search"
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
          <Col xs="12" md="12" sm="12" lg="12" className="mb-2">
            <Button variant="link" onClick={this.toggleAdvanceSearch} className="link">
              Advanced Search
            </Button>
          </Col>
          <Col hidden={showAdvancedSearch} xs="12" md="12" sm="12" lg="12" className="mb-3">
            <Row>
              <Col xs="12" sm="6" md="4" lg="3">
                <FormControl
                  placeholder="Filter By Location"
                  aria-label="search"
                  onChange={e => this.setState({ locationText: e.target.value })}
                  value={locationText}
                />
              </Col>
              <Col xs="12" sm="6" md="4" lg="3">
                <FormControl
                  placeholder="Filter By Experience"
                  aria-label="search"
                  onChange={e => this.setState({ experience: e.target.value })}
                  value={experience}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Filter.propTypes = {
  updateJobs: PropTypes.func.isRequired,
};

export default Filter;
