import React from 'react'
import './App.css'
import { Container, Col, Form, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Movie from './components/Movie'

// a component can be declared as a function or as a class

// render() is in charge of outputting the jsx out of your component
// render() is invoked again every time there's a change in the state or in the props of that component

class App extends React.Component {
  state = {
    movieTitle: 'Batman forever',
  }

  componentDidMount = () => {
    // this will happen AFTER the initial render of this component!
    console.log('just finished mounting!!')
  }

  render() {
    console.log('probably you changed your state!')
    return (
      <div className="App mt-3">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Choose your movie!</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.movieTitle}
                    onChange={(e) =>
                      this.setState({
                        movieTitle: e.target.value,
                      })
                    }
                  >
                    <option>Batman forever</option>
                    <option>Man of Steel</option>
                    <option>Wonder Woman</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Movie movie={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
