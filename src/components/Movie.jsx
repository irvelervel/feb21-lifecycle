import React from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

class Movie extends React.Component {

    state = {
        isLoading: false,
        isError: false,
        currentMovie: {}
    }

    componentDidMount = () => {
        console.log('componentDidMount in Movie')
        this.fetchMovieInfo()
    }

    componentDidUpdate = async (previousProps) => {
        console.log("I've just updated")
        console.log(previousProps) // are the props immediately before
        console.log(this.props) // the current props
        // we want to fetch new movie info just when we clicked on a DIFFERENT movie
        // we don't want to fetch the same movie over and over again

        if (previousProps.movie !== this.props.movie) {
            // this is preventing an infinite loop
            this.fetchMovieInfo()
        }
    }

    fetchMovieInfo = async () => {
        this.setState({
            isLoading: true
        })
        console.log('fetching the movie info')
        try {
            let response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + this.props.movie)
            let data = await response.json()
            if (data.Response === 'True') {
                console.log(data)
                this.setState({
                    isLoading: false,
                    isError: false,
                    currentMovie: data.Search[0],
                })
            } else {
                this.setState({
                    isError: true,
                    isLoading: false,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                isError: true,
                isLoading: false,
            })
        }
    }

    render() {
        // render should JUST output your JSX
        // console.log('rendering the Movie component')
        return (
            this.state.isError
                ? (
                    <Alert variant="danger">
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            Movie not found!
                        </p>
                    </Alert>
                )
                : this.state.isLoading
                    ? <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    : (
                        <Card>
                            <Card.Img variant="top" src={this.state.currentMovie.Poster} />
                            <Card.Body>
                                <Card.Title>{this.state.currentMovie.Title}</Card.Title>
                                <Card.Text>
                                    {this.state.currentMovie.imdbID} - {this.state.currentMovie.Year}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
        )
    }
}

export default Movie