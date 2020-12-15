import React from "react";

import styles from "./style.module.scss";

interface Props {
  fullscreen?: boolean;
}

function Loader(props: Props) {
  return <i className={`fas fa-spinner fa-spin ${styles.loader} ${props.fullscreen && styles.fullscreen}`}/>;
}

export default Loader;
