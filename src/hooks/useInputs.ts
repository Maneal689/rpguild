import { useState } from "react";

interface Arg {
  [key: string]: any;
}

function useInputs(obj: Arg) {
  let res: { [key: string]: any } = {};
  let [state, setState] = useState(obj);

  for (let key in obj) {
    res[key] = {
      value: state[key],
      onChange: (e: any) =>
        setState((old) => Object.assign({}, old, { [key]: e.target.value })),
    };
  }
  return res;
}

export default useInputs;
