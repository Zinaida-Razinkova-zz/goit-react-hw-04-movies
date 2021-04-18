import routes from "../../routes";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, location }) => {
  return (
    <>
      <ul>
        {movies.map(({ id, original_title }) => (
          <li key={id}>
            <Link
              className={styles.listMovieList}
              to={{
                pathname: `${routes.movies}/${id}`,
                state: { from: location },
              }}
            >
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MovieList.propTypes = {
  location: PropTypes.object,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      original_title: PropTypes.string,
    })
  ),
};

export default withRouter(MovieList);
