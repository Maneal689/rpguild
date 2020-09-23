import React from "react";

import styles from "./navbar.module.css";

function NavbarBrand(props) {
  return <div className={styles.brand}>{props.children}</div>;
}

export default NavbarBrand;
