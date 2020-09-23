import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";

import LoginRoute from "./components/LoginRoute";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import CreateQuest from "./pages/CreateQuest";
import Quest from "./pages/Quest";
import ApplyQuest from "./pages/ApplyQuest";
import QuestList from "./pages/QuestList";

import { auth, db } from "./services/firebase";
import userState from "./store/user";
import characterState from "./store/character";

import { CharacterDataType } from "./types/Character";

import "./App.css";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [character, setCharacter] = useRecoilState(characterState);

  useEffect(() => {
    if (!user.loading && character.loading) {
      if (localStorage.getItem("character")) {
        const { id: characterId } = JSON.parse(
          localStorage.getItem("character") as string
        );
        db.collection("users")
          .doc(user.uid)
          .collection("characters")
          .doc(characterId)
          .get()
          .then((characterDoc) => {
            setCharacter({
              loading: false,
              id: characterDoc.id,
              ...characterDoc.data() as CharacterDataType,
            });
          })
          .catch((e) => console.error(e.message));
      } else setCharacter({ loading: false, id: null });
    }
  }, [character, setCharacter, user]);

  useEffect(() => {
    //Even if redirect: store won't reinit (good)
    auth().onAuthStateChanged((newRawUser: any) => {
      const newUser = JSON.parse(JSON.stringify(newRawUser));
      setUser(Object.assign({ loading: false }, newUser));
    });
  }, [setUser]);
  return (
    <Router>
      <Switch>
        <LoginRoute exact path="/">
          <Home />
        </LoginRoute>
        <LoginRoute exact path="/home">
          <Home />
        </LoginRoute>
        <AuthRoute exact path="/selection">
          <Selection />
        </AuthRoute>
        <AuthRoute exact path="/createQuest">
          <CreateQuest />
        </AuthRoute>
        <AuthRoute exact path="/quest/lists">
          <QuestList />
        </AuthRoute>
        <AuthRoute exact path="/quest/:id">
          <Quest />
        </AuthRoute>
        <AuthRoute exact path="/quest/apply/:id">
          <ApplyQuest />
        </AuthRoute>
      </Switch>
    </Router>
  );
}

export default App;
