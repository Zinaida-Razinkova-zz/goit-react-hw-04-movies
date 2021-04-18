import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header className={styles.appBar}>
      <nav>
        <NavLink exact to={routes.home} className={styles.navlink}>
          Home
        </NavLink>
        <NavLink to={routes.movies} className={styles.navlink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default AppBar;
