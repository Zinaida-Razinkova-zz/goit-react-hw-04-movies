import React, { Component } from "react";
import Api from "../../Api";
import PropTypes from "prop-types";
// import styles from "./Cast.module.css";

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    Api.fetchCastMovies(this.props.match.params.movieId).then(({ data }) => {
      console.log(data.cast);
      this.setState({
        cast: data.cast,
      });
    });
  }

  render() {
    const { cast } = this.state;
    console.log(this.state.cast);
    return (
      <>
        {cast.length > 0 ? (
          <ul>
            {cast.map(({ id, profile_path, original_name, character }) => {
              return (
                <li key={id}>
                  <img
                    width="120"
                    src={`https://image.tmdb.org/t/p/w154${profile_path}`}
                    alt={original_name}
                  />
                  <p>{original_name}</p>
                  <p>Character: {character}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No information.</p>
        )}
      </>
    );
  }
}

Cast.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};

export default Cast;
