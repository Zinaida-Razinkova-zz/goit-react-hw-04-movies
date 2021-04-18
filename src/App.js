import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
// import Home from "./views/Home";
// import MovieDetailsPage from "./views/MovieDetailsPage";
// import MoviesPage from "./views/MoviesPage";
// import NotFoundView from "./views/NotFoundView";
import routes from "./routes";
import AppBar from "./components/AppBar/AppBar";

const Home = lazy(() =>
  import("./views/Home/Home" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviePage/MoviesPage" /* webpackChunkName: "home-page" */)
);

const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "home-page" */
  )
);

const NotFoundView = lazy(() =>
  import("./views/NotFoundView" /* webpackChunkName: "home-page" */)
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h1>Загружаем...</h1>}>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.movies} component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route component={NotFoundView} />
      </Switch>
    </Suspense>
  </>
);

export default App;
