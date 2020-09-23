import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { db } from "../services/firebase";
import userState from "../store/user";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";

import { Tab, TabToggler } from "../components/Tabs";
import SiteNavbar from "../components/SiteNavbar";

const Selection = () => {
  const user = useRecoilValue(userState);
  const [character, setCharacter] = useRecoilState(characterState);
  const [characterList, setCharacterList] = useState<CharacterDataType[]>([]);
  const [masterQuestList, setMasterQuestList] = useState<QuestInfoType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("character");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const hist = useHistory();

  const createCharacter = useCallback(() => {
    const characterName = window.prompt("Character name: ");
    db.collection("users")
      .doc(user.uid)
      .collection("characters")
      .add({ name: characterName });
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
              style={{overflow: "hidden"}}
              key={index}
              onClick={() => {
                localStorage.setItem(
                  "character",
                  JSON.stringify({ id: char.id })
                );
                setCharacter(char);
              }}
            >
              {JSON.stringify(char)}
            </li>
          ))}
        </ul>
        <button onClick={createCharacter}>Create new character</button>
      </Tab>
      <Tab active={activeTab === "master"}>
        {/* TODO: <QuestTile /> */}
        {masterQuestList.map((quest, index) => (
          <div
            key={index}
            onClick={() => {
              if (quest.started) hist.push(`/quest/${quest.id}`);
              else hist.push(`/quest/apply/${quest.id}`);
            }}
          >
            {JSON.stringify(quest)}
          </div>
        ))}
        <Link to="/createQuest">Créer une nouvelle quête</Link>
      </Tab>
      <TabToggler targetKey="character" setActiveKey={setActiveTab}>
        Personnages
      </TabToggler>
      <TabToggler targetKey="master" setActiveKey={setActiveTab}>
        Quêtes gérées
      </TabToggler>
    </div>
  );
};

export default Selection;
