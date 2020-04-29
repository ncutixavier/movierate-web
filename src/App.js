import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
import { withCookies } from 'react-cookie'

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }
  //movies = ['blacklist', 'punisher']

  componentDidMount() {
    if (this.state.token) {
      //fetch data
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token 	${this.state.token}`
        }
      }).then(resp => resp.json())
        .then((res) => this.setState({ movies: res }))
        .catch(error => console.log(error))
    } else {
      window.location.href = "/"
    }
  }

  loadMovie = movie => {
    // console.log(movie)
    this.setState({ selectedMovie: movie, editedMovie: null })
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id)
    this.setState({ movies: movies, selectedMovie: null })
  }

  editClicked = selMovie => {
    this.setState({ editedMovie: selMovie })
  }

  newMovie = () => {
    this.setState({ editedMovie: { title: '', desciption: '' } })
  }

  cancelClicked = () => {
    this.setState({ editedMovie: null })
  }

  addMovie = movie => {
    this.setState({ movies: [...this.state.movies, movie] })
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted} editClicked={this.editClicked}
            newMovie={this.newMovie} token={this.state.token}/>

          <div>
            {!this.state.editedMovie ?
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} 
              token={this.state.token}/>

              : <MovieForm movie={this.state.editedMovie} cancelClicked={this.cancelClicked}
                newMovie={this.addMovie} editedMovie={this.loadMovie} 
                token={this.state.token}/>
                
            }
          </div>
        </div>
      </div>
    );
  }

}

export default withCookies(App);
