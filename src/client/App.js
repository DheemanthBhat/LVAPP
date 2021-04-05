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

export default class App extends Component {
  state = {
    jobs: [],
    showAdvancedSearch: true
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/jobs')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ jobs: data.jobs });
      });
  }

  toggleAdvanceSearch = () => {
    const { showAdvancedSearch } = this.state;
    this.setState({ showAdvancedSearch: !showAdvancedSearch });
  }

  render() {
    const { jobs, showAdvancedSearch } = this.state;

    return (
      <div className="app-container">
        <Container fluid>
          <Row className="c-m-b">
            <Col xs="12" sm="12" md="4" lg="3">
              <FormControl
                placeholder="Search By Keywords"
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col>
              <Form>
                <Form.Check inline label="All" type="checkbox" id="all" />
                <Form.Check inline label="Full-Time" type="checkbox" id="full_time" />
                <Form.Check inline label="Part-Time" type="checkbox" id="part_time" />
                <Form.Check inline label="Freelancer" type="checkbox" id="free_lancer" />
                <Button variant="primary" type="submit">Search</Button>
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
                  <Button variant="light" className="light-btn">Filter By Location</Button>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                  <Button variant="light" className="light-btn">Filter By Experience</Button>
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
