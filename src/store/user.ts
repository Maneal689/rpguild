import { atom } from "recoil";

const userState = atom<any>({
  key: "USER",
  default: { loading: true },
});

export default userState;
