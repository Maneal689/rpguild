import React, {
  Reducer,
  useState,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";

import { db } from "../services/firebase";
import { isApplied } from "../helpers/quest";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";

import QuestTile from "../components/QuestTile";
import SiteNavbar from "../components/SiteNavbar";
import Loader from "../components/Loader";

import styles from "../styles/QuestList.module.scss";

const defaultQuestState: QuestInfoType[] = [];

function questReducer(state: QuestInfoType[], action: any) {
  function unapply(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }
    if (questIndex !== -1) {
      newQuest = Object.assign({}, oState[questIndex]);
      delete newQuest.participants[action.payload.userId];
      return [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
    } else return oState;
  }

  function apply(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }

    if (questIndex !== -1) {
      newQuest = Object.assign({}, oState[questIndex]);
      newQuest.participants[action.payload.userId] = {
        status: "pending",
        character: action.payload.characterId,
      };
      return [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
    } else return oState;
  }

  function valid(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }
    if (questIndex !== -1) {
      const characterId =
        oState[questIndex].participants[action.payload.userId].character;
      newQuest = Object.assign({}, oState[questIndex]);
      newQuest.participants[action.payload.userId] = {
        status: "member",
        character: characterId,
      };
      let newState = [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
      for (let q of action.payload.appliedQuestList) {
        if (q.id !== questId) newState = unapply(newState, q.id);
      }
      return newState;
    } else return oState;
  }

  switch (action.type) {
    case "INIT":
      return action.payload;
    case "APPLY":
      return apply(state, action.payload.questId);
    case "UNAPPLY":
      return unapply(state, action.payload.questId);
    case "VALID":
      return valid(state, action.payload.questId);

    default:
      return state;
  }
}

function QuestList() {
  const character = useRecoilValue(characterState);
  const [questList, dispatchQuest] = useReducer<Reducer<QuestInfoType[], any>>(
    questReducer,
    defaultQuestState
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [applyQuestOnly, setApplyQuestOnly] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const hist = useHistory();

  const appliedQuestIdList = useMemo(() => {
    if (character.id) {
      return questList
        .filter((quest) => isApplied(quest, character.id))
        .map((quest) => quest.id);
    }
    return [];
  }, [character.id, questList]);

  // Redirect if no character selected or already in quest
  useEffect(() => {
    if (!character.loading && !character.id) hist.replace("/selection");
    if (character.id && !character.loading && character.currentQuest)
      hist.replace(`/quest/${character.currentQuest}`);
  }, [character, hist]);

  // Fetch quests data list
  useEffect(() => {
    if (character.id) {
      db.collection("quests")
        .get()
        .then((snapshot) => {
          let res: QuestInfoType[] = [];
          snapshot.forEach((questDoc) => {
            const quest = questDoc.data();
            res.push({ id: questDoc.id, ...(quest as QuestInfoType) });
          });
          dispatchQuest({ type: "INIT", payload: res });
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [character]);

  // Filtered quest list
  const fQuestList = useMemo(() => {
    return questList.filter((quest) => {
      if (applyQuestOnly) {
        return appliedQuestIdList.indexOf(quest.id) !== -1;
      }

      if (character.id)
        return (
          character.level >= quest.levelMin && character.level <= quest.levelMax
        );
      return false;
    });
  }, [appliedQuestIdList, applyQuestOnly, character, questList]);

  if (error) return <div className="content">{error}</div>;
  return (
    <div className="content">
      <SiteNavbar />
      <section className={`${styles.sign}`}>
        <p>Bienvenue à toi cher(e) aventurièr(e) !</p>
        <p>
          Je suppose que tu n'es pas venu(e) ici pour boire un verre, mais
          plutôt pour une mission ? Je te laisse rejoindre le tableau de quête
          ci-dessous.
          <br />
          Tu y trouvera différentes quêtes proposées par des "
          <em className={styles.green}>Maîtres de Jeu</em>" du monde entier !
        </p>
        <p>Bon courage !</p>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <ul className={`${styles.questList}`}>
          {fQuestList.map((quest, index) => (
            <QuestTile
              quest={quest}
              questList={questList}
              key={index}
              dispatchQuest={dispatchQuest}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestList;
