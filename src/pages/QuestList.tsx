import React, {
  Reducer,
  useState,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useRecoilValue } from "recoil";
import { useHistory, Route } from "react-router-dom";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { db } from "../services/firebase";
import { isApplied } from "../helpers/quest";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";
import { questReducer, defaultQuestState } from "../helpers/questListReducer";

import {
  QuestTile,
  SelectedQuestTileWrapper,
  HelpTile,
} from "../components/QuestTile";

import SiteNavbar from "../components/SiteNavbar";
import Loader from "../components/Loader";
import SignText from "../components/SignText";

import styles from "../styles/QuestList.module.scss";

function QuestList() {
  const character = useRecoilValue(characterState);
  const [questList, dispatchQuest] = useReducer<Reducer<QuestInfoType[], any>>(
    questReducer,
    defaultQuestState
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [applyQuestOnly, setApplyQuestOnly] = useState<boolean>(false);
  const [displayHelp, setDisplayHelp] = useState<boolean>(false);
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
      <HelpTile show={displayHelp} close={() => setDisplayHelp(false)} />
      <section className={`${styles.sign}`}>
        <aside
          className={styles.helpTrigger}
          onClick={() => setDisplayHelp((old) => !old)}
        >
          <i title="Légende des icônes" className="far fa-question-circle" />
        </aside>
        <SignText appliedOnly={applyQuestOnly} />
        <button
          className={`${styles.arrow} ${
            applyQuestOnly ? styles.left : styles.right
          }`}
          onClick={() => setApplyQuestOnly((old) => !old)}
        >
          <i className={`fas fa-angle-${applyQuestOnly ? "left" : "right"}`} />
        </button>
      </section>
      <AnimateSharedLayout type="crossfade">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul className={`${styles.questList}`}>
              {/* TODO: Add info tile when no quest */}
              {fQuestList.map((quest, index) => (
                <QuestTile
                  quest={quest}
                  questList={questList}
                  key={index}
                  dispatchQuest={dispatchQuest}
                />
              ))}
            </ul>
            <AnimatePresence>
              <Route path="/quest/lists/:id">
                <SelectedQuestTileWrapper
                  questList={questList}
                  dispatchQuest={dispatchQuest}
                />
              </Route>
            </AnimatePresence>
          </>
        )}
      </AnimateSharedLayout>
    </div>
  );
}

export default QuestList;
