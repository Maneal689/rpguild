import React from "react";

import styles from "./Carousel.module.css";

function Slide(props) {
  return <div className={styles.slide}>{props.children}</div>;
}

export default Slide;
