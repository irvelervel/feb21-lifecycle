import React from 'react'
import { Card } from 'react-bootstrap'

class Movie extends React.Component {

    state = {
        currentMovie: {}
    }

    componentDidMount = async () => {
        console.log('fetching the movie info')
        try {

            let response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + this.props.movie)
            let data = await response.json()
            console.log(data)
            this.setState({
                currentMovie: data.Search[0]
            })

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        console.log('this is movie component')
        return (
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
    }
}

export default Movie