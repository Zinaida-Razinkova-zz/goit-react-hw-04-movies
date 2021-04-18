import { React, Component } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Api from "../../Api";
import styles from "./Home.module.css";

class Home extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    Api.fetchTrendingMovies().then(({ data }) => {
      // console.log(data.results);
      const resultsMovies = data.results;
      this.setState({ movies: resultsMovies });
    });
  }

  render() {
    // console.log(this.props.match.url);
    const { movies } = this.state;
    return (
      <>
        <h4 className={styles.titleHome}>Trending today</h4>
        <MovieList movies={movies} />
      </>
    );
  }
}
export default Home;
