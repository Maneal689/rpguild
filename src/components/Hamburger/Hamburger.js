import React from "react";
import PropTypes from "prop-types";

import styles from "./hamburger.module.css";

function Hamburger(props) {
  return (
    <div
      className={`${styles["hamburger-container"]} ${props.className}`}
      onClick={() => props.setActive(!props.active)}
    >
      <div
        className={`${styles.hamburger} ${props.active ? styles.active : ""}`}
      />
    </div>
  );
}

Hamburger.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default Hamburger;
