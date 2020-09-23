import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarItem } from "../Navbar";

import characterState from "../../store/character";
// import userState from "../../store/user";
import { logout } from "../../helpers/auth";

function SiteNavbar() {
  // const user = useRecoilValue(userState);
  const [character, setCharacter] = useRecoilState(characterState);

  const hist = useHistory();

  const resetCharacter = function () {
    localStorage.removeItem("character");
    setCharacter({ loading: false, id: null });
    hist.push("/selection");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <h1>RPGuild</h1>
      </NavbarBrand>
      <NavbarItem right>
        {character.id ? character.name : "<null>"} (lv.{" "}
        {character.id ? character.level : "<null>"})
      </NavbarItem>
      <NavbarItem right>
        <button
          onClick={() => {
            try {
              logout();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Se déconnecter
        </button>
      </NavbarItem>
      <NavbarItem right>
        <button onClick={resetCharacter}>Changer de personnage</button>
      </NavbarItem>
    </Navbar>
  );
}

export default SiteNavbar;
