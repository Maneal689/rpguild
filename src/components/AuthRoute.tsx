import React, { useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import userState from "../store/user";

function AuthRoute(props: any) {
  const user = useRecoilValue(userState);
  const hist = useHistory();

  useEffect(() => {
    if (!user.loading && !user.uid) {
      hist.replace("/");
    }
  }, [hist, user]);
  return <Route {...props} />;
}

export default AuthRoute;
