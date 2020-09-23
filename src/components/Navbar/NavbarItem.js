import React from "react";

import styles from "./navbar.module.css";

function NavbarItem(props) {
  return <div className={styles.item}>{props.children}</div>;
}

export default NavbarItem;
