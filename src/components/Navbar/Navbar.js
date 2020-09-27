import React, { useState, useMemo } from "react";

import Hamburger from "../Hamburger";
import NavbarBrand from "./NavbarBrand";
import NavbarItem from "./NavbarItem";

import styles from "./navbar.module.css";

function getBrand(children) {
  let res = null;
  React.Children.forEach(children, (child) => {
    if (child.type.name === NavbarBrand.name) res = child;
  });
  return res;
}

function getItems(children, right = false) {
  return React.Children.map(children, (child) => {
    if (
      child.type.name === NavbarItem.name &&
      child.props.right === (right === false ? undefined : true)
    )
      return child;
    return null;
  });
}

function Navbar(props) {
  const [active, setActive] = useState(false);
  const brand = useMemo(() => getBrand(props.children), [props.children]);
  const items = useMemo(() => getItems(props.children), [props.children]);
  const rightItems = useMemo(() => getItems(props.children, true), [
    props.children,
  ]);

  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        {brand}
        <div className={`${styles.items} ${active ? styles.active : ""}`}>
          <div>{items}</div>
          <div>{rightItems}</div>
        </div>
      </div>
      <Hamburger
        className={styles["desktop-hidden"]}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

export default Navbar;
