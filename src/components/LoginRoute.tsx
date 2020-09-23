import React, { useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import userState from "../store/user";

function LoginRoute(props: any) {
  const user = useRecoilValue(userState);
  const hist = useHistory();

  useEffect(() => {
    if (user.uid) hist.replace("/selection");
  }, [hist, user]);
  return <Route {...props} />;
}

export default LoginRoute;
