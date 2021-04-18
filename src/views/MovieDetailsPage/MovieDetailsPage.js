import React, { Component, Suspense, lazy } from "react";
import Api from "../../Api";
import { Link, withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
// import Cast from "../components/Cast";
// import Reviews from "../components/Reviews";
import routes from "../../routes";
import PropTypes from "prop-types";
import styles from "./MovieDetailsPage.module.css";

const Cast = lazy(() =>
  import("../../components/Cast/Cast" /* webpackChunkName: "cast-page"*/)
);

const Reviews = lazy(() =>
  import(
    "../../components/Reviews/Reviews" /* webpackChunkName: "reviews-page"*/
  )
);

class MovieDetailsPage extends Component {
  state = {
    movieDetails: null,
  };

  async componentDidMount() {
    Api.fetchDetailsMovies(this.props.match.params.movieId).then(({ data }) => {
      // console.log(data);

      this.setState({ movieDetails: data });
    });
  }

  goBackButton = () => {
    const { location, history } = this.props;
    // console.log(location.state.from);

    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { url } = this.props.match;
    return (
      <>
        <div className={styles.blockButtonGoBack}>
          <button
            className={styles.buttonGoBack}
            type="button"
            onClick={this.goBackButton}
          >
            Go back
          </button>
        </div>
        {this.state.movieDetails && (
          <div>
            <img
              width="400"
              src={`https://image.tmdb.org/t/p/w780${this.state.movieDetails.backdrop_path}`}
              alt={this.state.movieDetails.title}
            />
            <div>
              <h2 className={styles.titleMovieDetailsPage}>
                {this.state.movieDetails.title}
              </h2>
              <p>
                User Score: {Number(this.state.movieDetails.vote_average) * 10}%
              </p>
              <h3>Overview</h3>
              <p>{this.state.movieDetails.overview}</p>
              <h3>Genres</h3>
              <p>
                {this.state.movieDetails.genres.reduce(
                  (acc, { name }) => acc + " " + name,
                  ""
                )}
              </p>
            </div>
          </div>
        )}

        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link className={styles.titleReviewsCast} to={`${url}/cast`}>
                Cast
              </Link>
            </li>
            <li>
              <Link className={styles.titleReviewsCast} to={`${url}/reviews`}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<h1>Загружаем...</h1>}>
          <Switch>
            <Route path={routes.moviesCast} component={Cast} />
            <Route path={routes.moviesReviews} component={Reviews} />
          </Switch>
        </Suspense>
      </>
    );
  }
}
MovieDetailsPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};

export default withRouter(MovieDetailsPage);
