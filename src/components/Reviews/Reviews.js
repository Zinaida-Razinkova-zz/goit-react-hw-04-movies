import React, { Component } from "react";
import Api from "../../Api";
import PropTypes from "prop-types";
// import styles from "./Reviews.module.css";

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    Api.fetchReviewsMovies(this.props.match.params.movieId).then(({ data }) => {
      // console.log(data.results);

      this.setState({ reviews: data.results });
    });
  }

  render() {
    const { reviews } = this.state;

    // console.log(this.state.reviews);
    return (
      <>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(({ author, content, id }) => {
              return (
                <li key={id}>
                  <h5>Autor: {author}</h5>
                  <p>{content}</p>
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

Reviews.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};

export default Reviews;
