import React from "react";

import styles from "./style.module.scss";

interface Props {
  fullscreen?: boolean;
}

const defaultProps = {
  fullscreen: false,
};

function Loader(props: Props) {
  const fProps: Props = Object.assign({}, defaultProps, props);
  return <i className={`fas fa-spinner fa-spin ${styles.loader} ${fProps.fullscreen && styles.fullscreen}`}/>;
}

export default Loader;
