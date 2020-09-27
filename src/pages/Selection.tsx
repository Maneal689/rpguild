import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory, useParams, Link } from "react-router-dom";

import { db } from "../services/firebase";
import userState from "../store/user";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";

import { Tab } from "../components/Tabs";
import SiteNavbar from "../components/SiteNavbar";
import { QuestTile } from "../components/QuestTile";

import styles from "../styles/Selection.module.scss";

const Selection = () => {
  const user = useRecoilValue(userState);
  const [character, setCharacter] = useRecoilState(characterState);

  const [characterList, setCharacterList] = useState<CharacterDataType[]>([]);
  const [masterQuestList, setMasterQuestList] = useState<QuestInfoType[]>([]);

  const { tab } = useParams();
  const activeTab = tab ? tab : "character";

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const hist = useHistory();

  const createCharacter = useCallback(() => {
    const characterName = window.prompt("Character name: ");
    db.collection("users")
      .doc(user.uid)
      .collection("characters")
      .add({ name: characterName, level: 0 });
  }, [user.uid]);

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
      <Tab active={activeTab === "character"}>
        {/* TODO: <CharacterSelection /> */}
        <ul>
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
        <button onClick={createCharacter}>Create new character</button>
      </Tab>
      <Tab active={activeTab === "quest"}>
        {/* TODO: <QuestTile /> */}
        {masterQuestList.map((quest, index) => (
          <QuestTile
            key={index}
            quest={quest}
            questList={masterQuestList}
            dispatchQuest={null}
            master
          />
        ))}
        <Link to="/createQuest" className={styles.createQuestBtn}>Créer une nouvelle quête</Link>
      </Tab>
      <div className={styles.bottomNav}>
        <Link to="/selection/character" className={activeTab === "character" ? styles.active : ""}>Personnages</Link>
        <Link to="/selection/quest" className={activeTab === "quest" ? styles.active : ""}>Quêtes gérées</Link>
      </div>
    </div>
  );
};

export default Selection;
