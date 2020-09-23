import { atom } from "recoil";

import { CharacterType } from "../types/Character";

const characterState = atom<CharacterType>({
  key: "CHARACTER",
  default: { loading: true, id: null },
});

export default characterState;
