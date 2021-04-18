import { React, Component } from "react";
import Api from "../../Api";
import MovieList from "../../components/MovieList/MovieList";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MoviePage.module.css";

const getCategoryFromProps = (props) =>
  queryString.parse(props.location.search).query;

class MoviePage extends Component {
  state = {
    query: "",
    movies: [],
    page: 1,
  };
  componentDidMount() {
    const query = getCategoryFromProps(this.props);
    if (query) {
      const { page } = this.state;

      Api.fetchSearchMovie({ query: query, page: page }).then(({ results }) => {
        this.setState({ movies: [...results] });
      });
    }
  }
  componentDidUpdate(prevProps) {
    const prevQuery = getCategoryFromProps(prevProps);
    const nextQuery = getCategoryFromProps(this.props);
    if (prevQuery !== nextQuery) {
      const { page } = this.state;

      Api.fetchSearchMovie({ query: nextQuery, page: page }).then(
        ({ results }) => {
          this.setState({ movies: [...results] });
        }
      );
    }
  }
  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  searchSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    if (query !== "") {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${query}`,
      });
    }
  };

  render() {
    const { movies, isLoading, query } = this.state;
    return (
      <div className={styles.blockSearch}>
        <form onSubmit={this.searchSubmit}>
          <label className={styles.labelSearch}>
            <input
              type="text"
              name="query"
              value={query}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.buttonSearch} type="submit">
            Search
          </button>
        </form>

        {!isLoading && <MovieList movies={movies} />}
      </div>
    );
  }
}

MoviePage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }),
  }),
};
export default withRouter(MoviePage);
