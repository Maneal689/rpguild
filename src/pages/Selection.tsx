import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory, useParams, Link } from "react-router-dom";
import Tour from "reactour";

import { db } from "../services/firebase";
import userState from "../store/user";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";

import { Tab } from "../components/Tabs";
import SiteNavbar from "../components/SiteNavbar";
import { QuestTile } from "../components/QuestTile";

import styles from "../styles/Selection.module.scss";

const steps = [
  {
    selector: "#select-char",
    content: (
      <div>
        Ici vous pouvez voir la liste de vos <strong>personnages</strong>.
        Cliquez sur l'un d'eux pour le sélectionner et jouer avec !
      </div>
    ),
  },
  {
    selector: "#bottom-nav",
    content: (
      <div>
        Ici vous pouvez choisir de voir vos <strong>personnages</strong> ou les{" "}
        <strong>quêtes</strong> que vous avez créée !<br />
        Choisissez une de vos quête pour y entrer en tant que{" "}
        <strong>Maître de Jeu</strong>
      </div>
    ),
  },
  {
    selector: "#create-btn",
    content: (
      <div>
        Cliquez sur ce bouton pour <strong>créer</strong> un(e) personnage/quête
        selon l'onglet dans lequel vous vous trouvez !
      </div>
    ),
  },
];

const Selection = () => {
  const user = useRecoilValue(userState);
  const [character, setCharacter] = useRecoilState(characterState);

  const [characterList, setCharacterList] = useState<CharacterDataType[]>([]);
  const [masterQuestList, setMasterQuestList] = useState<QuestInfoType[]>([]);

  const { tab } = useParams();
  const activeTab = tab ? tab : "character";

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [initTour, setInitTour] = useState<boolean>(false);
  const [displayTour, setDisplayTour] = useState<boolean>(false);

  const hist = useHistory();

  useEffect(() => {
    if (!loading && !initTour) {
      setInitTour(true);
      if (localStorage.getItem("selectionTour") !== "true")
        setDisplayTour(true);
      localStorage.setItem("selectionTour", "true");
    }
  }, [initTour, loading]);

  // Redirect if character selected
  useEffect(() => {
    if (!character.loading && character.id) {
      if (!character.currentQuest) hist.replace("/quest/lists");
      else hist.replace(`/quest/${character.currentQuest}`);
    }
  }, [character, hist]);

  // Fetch characters and mastered quests
  useEffect(() => {
    if (user.uid) {
      let cpt = 0;
      db.collection("users")
        .doc(user.uid)
        .collection("characters")
        .get()
        .then(function (snapshot) {
          snapshot.forEach((snap) => {
            setCharacterList((old) => [
              ...old,
              { id: snap.id, ...(snap.data() as CharacterDataType) },
            ]);
          });
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          cpt += 1;
          if (cpt === 2) setLoading(false);
        });
      db.collection("quests")
        .where("master", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((snap) => {
            setMasterQuestList((old) => [
              ...old,
              { id: snap.id, ...(snap.data() as QuestInfoType) },
            ]);
          });
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          cpt += 1;
          if (cpt === 2) setLoading(false);
        });
    }
  }, [user.uid]);

  if (loading) return <div>loading...</div>;
  else if (error)
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  return (
    <div className="content">
      <SiteNavbar />
      <Tour
        isOpen={displayTour}
        onRequestClose={() => setDisplayTour(false)}
        steps={steps}
        accentColor="#4e6950"
      />
      <Tab active={activeTab === "character"}>
        {/* TODO: <CharacterSelection /> */}
        <ul id="select-char">
          {characterList.map((char, index) => (
            <li
              style={{ overflow: "hidden" }}
              key={index}
              onClick={() => {
                localStorage.setItem(user.uid, char.id);
                setCharacter(char);
              }}
            >
              {JSON.stringify(char)}
            </li>
          ))}
        </ul>
      </Tab>
      <Tab active={activeTab === "quest"}>
        <ul className={styles.questList}>
          {masterQuestList.map((quest, index) => (
            <QuestTile
              key={index}
              quest={quest}
              questList={masterQuestList}
              dispatchQuest={null}
              master
            />
          ))}
        </ul>
      </Tab>
      <div id="bottom-nav" className={styles.bottomNav}>
        <Link
          to="/selection/character"
          className={activeTab === "character" ? styles.active : ""}
        >
          <i className="fas fa-street-view" />
          Personnages
        </Link>
        <Link
          id="create-btn"
          to={activeTab === "quest" ? "/createQuest" : "/createCharacter"}
          className={styles.createBtn}
        >
          +
        </Link>
        <Link
          to="/selection/quest"
          className={activeTab === "quest" ? styles.active : ""}
        >
          <i className="far fa-map" />
          Quêtes gérées
        </Link>
      </div>
    </div>
  );
};

export default Selection;
