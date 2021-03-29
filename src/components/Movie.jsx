import React from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

class Movie extends React.Component {

    timer = null

    state = {
        isLoading: false,
        isError: false,
        currentMovie: {}
    }

    componentDidMount = () => {
        console.log('componentDidMount in Movie')
        // now this.props.movie will be "Batman forever"
        this.fetchMovieInfo()
        this.timer = setInterval(() => console.log('time passes by'), 1000)
    }

    componentDidUpdate = async (previousProps, previousState) => {

        // we'll enter here if there's a change in the PROPS or in the STATE

        // we're entering here TWO times every time we select a new movie:
        // 1) when we receive a new movie from the props (when this.props.movie changes)
        // -- when this happens, we'll set a new state into this component, and we'll enter....
        // 2) when we just set a new state, and this time we want to STOP, because we don't need to fetch new data

        console.log("I've just updated")
        console.log(previousProps) // are the props immediately before
        console.log(this.props) // the current props
        // we want to fetch new movie info just when we clicked on a DIFFERENT movie
        // we don't want to fetch the same movie over and over again

        if (previousProps.movie !== this.props.movie) {
            // this is preventing an infinite loop
            // we need to know if this refresh happened because we change the dropdown,
            // so we're getting a new movie, OR if this refresh happened because we 
            // fetched the movie info and we set the state
            this.fetchMovieInfo()
        }
    }

    componentWillUnmount = () => {
        // get's called an instant before the unmounting of a component
        console.log('THE MOVIE COMPONENT IS GOING TO DISAPPEAR')
        clearInterval(this.timer)
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