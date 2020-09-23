import React from "react";
import PropsTypes from "prop-types";

import styles from "./Carousel.module.css";

const Indicator = (props) => {
  return (
    <div
      className={`${styles.indicator} ${props.active ? styles.active : ""}`}
      onClick={props.onClick}
    />
  );
};

Indicator.propTypes = {
  active: PropsTypes.bool.isRequired,
  onClick: PropsTypes.func.isRequired,
};

export default Indicator;
