import { useState } from "react";

interface Arg {
  [key: string]: any;
}

function useInputs(obj: Arg) {
  let res: { [key: string]: any } = {};
  let [state, setState] = useState(obj);
  let errObj: any = {};
  for (let key in state) {
    errObj[key] = "";
  }
  let [errState, setError] = useState(errObj);

  for (let key in state) {
    res[key] = {
      value: state[key],
      set: (arg: any) => {
        let newVal = typeof arg === "function" ? arg(state[key]) : arg;
        setState((old) => Object.assign({}, old, { [key]: newVal }));
      },
      error: errState[key],
      setError: (err: string) =>
        setError((old: any) => Object.assign({}, old, { [key]: err })),
      onChange: (e: any) => {
        const targetValue = e.target.value;
        setState((old) => Object.assign({}, old, { [key]: targetValue }));
      },
    };
  }
  return res;
}

export default useInputs;
