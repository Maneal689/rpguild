import React, {
  Reducer,
  useState,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import { useHistory, useParams } from "react-router-dom";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import Tour from "reactour";

import { db } from "../services/firebase";
import { isApplied } from "../helpers/quest";
import userState from "../store/user";
import characterState from "../store/character";
import { QuestInfoType } from "../types/Quest";
import { questReducer, defaultQuestState } from "../helpers/questListReducer";

import { QuestTile, HelpTile } from "../components/QuestTile";
import SiteNavbar from "../components/SiteNavbar";
import Loader from "../components/Loader";
import SignText from "../components/SignText";

import styles from "../styles/QuestList.module.scss";

const steps = [
  {
    selector: "#quest-list",
    content: (
      <div>
        Vous trouverez ici la liste des quêtes <strong>disponibles</strong>
      </div>
    ),
  },
  {
    selector: "#loadMore",
    content: (
      <div>
        Cliquez ici pour charger plus de <strong>quêtes</strong>
      </div>
    ),
  },
  {
    selector: "#help-btn",
    content: (
      <div>
        Si vous n'avez pas encore appris notre langue, cliquez ici, tous les
        symboles utilisés vous seront expliqués.
        <br />
        De plus, vous pourrez me rappeler de là !
      </div>
    ),
  },
  {
    selector: "#quest-list-toggler",
    content: (
      <div>
        Cliquez ici pour <strong>alterner</strong> entre vos candidatures et toutes les
        quêtes
      </div>
    ),
  },
];

function QuestList() {
  const character = useRecoilValue(characterState);
  const user = useRecoilValue(userState);
  const [questList, dispatchQuest] = useReducer<Reducer<QuestInfoType[], any>>(
    questReducer,
    defaultQuestState
  );
  const [selectedQuest, setSelectedQuest] = useState<QuestInfoType | null>(
    null
  );
  const [lastQDoc, setLastQDoc] = useState<any>(null);

  const [initTour, setInitTour] = useState<boolean>(false);
  const [displayTour, setDisplayTour] = useState<boolean>(false);
  const [displayHelp, setDisplayHelp] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [applyQuestOnly, setApplyQuestOnly] = useState<boolean>(false);
  const { id: selectedQuestId } = useParams();
  const hist = useHistory();

  // Find selected quest or fetch data if not in current list
  useEffect(() => {
    // If quest is selected && selectedQuest not already loaded
    if (
      selectedQuestId &&
      (!selectedQuest ||
        !selectedQuest.id ||
        selectedQuest.id !== selectedQuestId)
    ) {
      let finded = false;
      for (let q of questList) {
        if (q.id === selectedQuestId) {
          setSelectedQuest(q);
          finded = true;
        }
      }
      if (!finded) {
        db.collection("quests")
          .doc(selectedQuestId)
          .get()
          .then((questDoc) => {
            setSelectedQuest({
              id: questDoc.id,
              ...(questDoc.data() as QuestInfoType),
            });
          });
      }
    }
  }, [questList, selectedQuest, selectedQuestId]);

  //Disable tour for next time
  useEffect(() => {
    if (!loading && !initTour) {
      setInitTour(true);
      localStorage.setItem("questTour", "true");
      if (localStorage.getItem("questTour") !== "true") setDisplayTour(true);
    }
  }, [displayTour, initTour, loading]);

  // Redirect if no character selected or already in quest
  useEffect(() => {
    if (!character.loading && !character.id) hist.replace("/selection");
    if (character.id && !character.loading && character.currentQuest)
      hist.replace(`/quest/${character.currentQuest}`);
  }, [character, hist]);

  // Every time onlyApplied toggles => Fetch quests (all 20 first quests or all applied quests)
  useEffect(() => {
    setLoading(true);
    dispatchQuest({ type: "INIT", payload: [] });
    if (!applyQuestOnly) {
      db.collection("quests")
        .where("started", "==", false)
        .orderBy("date", "desc")
        .limit(20)
        .get()
        .then((snapshot) => {
          let res: QuestInfoType[] = [];
          snapshot.forEach((questDoc) => {
            const quest = questDoc.data();
            res.push({ id: questDoc.id, ...(quest as QuestInfoType) });
          });
          if (res.length > 0) {
            let lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastQDoc(lastDoc);
            dispatchQuest({ type: "INIT", payload: res });
          }
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      db.collection("quests")
        .where(`participants.${user.uid}.character`, "==", character.id)
        .get()
        .then((snapshot) => {
          let res: QuestInfoType[] = [];
          snapshot.forEach((questDoc) => {
            const quest = questDoc.data();
            res.push({ id: questDoc.id, ...(quest as QuestInfoType) });
          });
          if (res.length > 0) {
            dispatchQuest({ type: "INIT", payload: res });
          }
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [applyQuestOnly, character.id, user.uid]);

  const fetchQuests = useCallback(() => {
    setLoading(true);
    db.collection("quests")
      .where("started", "==", false)
      .orderBy("date", "desc")
      .limit(20)
      .startAfter(lastQDoc)
      .get()
      .then((snapshot) => {
        let res: QuestInfoType[] = [];
        snapshot.forEach((questDoc) => {
          const quest = questDoc.data();
          res.push({ id: questDoc.id, ...(quest as QuestInfoType) });
        });
        if (res.length > 0) {
          let lastDoc = snapshot.docs[snapshot.docs.length - 1];
          setLastQDoc(lastDoc);
          dispatchQuest({ type: "ADD", payload: res });
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [lastQDoc]);

  if (error) return <div className="content">{error}</div>;
  return (
    <div className="content">
      <SiteNavbar />
      <Tour
        isOpen={displayTour}
        onRequestClose={() => setDisplayTour(false)}
        steps={steps}
        accentColor="#4e6950"
      />
      <HelpTile
        show={displayHelp}
        close={() => setDisplayHelp(false)}
        displayTour={() => setDisplayTour(true)}
      />
      <section className={`${styles.sign}`}>
        <aside
          id="help-btn"
          className={styles.helpTrigger}
          onClick={() => setDisplayHelp((old) => !old)}
        >
          <i title="Légende des icônes" className="far fa-question-circle" />
        </aside>
        <SignText appliedOnly={applyQuestOnly} />
        <button
          id="quest-list-toggler"
          className={`${styles.arrow} ${
            applyQuestOnly ? styles.left : styles.right
          }`}
          onClick={() => setApplyQuestOnly((old) => !old)}
        >
          <i className={`fas fa-angle-${applyQuestOnly ? "left" : "right"}`} />
        </button>
      </section>
      <AnimateSharedLayout type="crossfade">
        <motion.ul id="quest-list" className={`${styles.questList}`} layout>
          {/* TODO: Add info tile when no quest */}
          {questList.map((quest) => (
            <QuestTile
              quest={quest}
              questList={questList}
              key={quest.id}
              dispatchQuest={dispatchQuest}
            />
          ))}
        </motion.ul>
        <AnimatePresence>
          {selectedQuestId &&
            selectedQuest &&
            selectedQuest.id === selectedQuestId && (
              <QuestTile
                quest={selectedQuest}
                questList={questList}
                dispatchQuest={dispatchQuest}
                key={selectedQuest.id}
                fullscreen
              />
            )}
        </AnimatePresence>
      </AnimateSharedLayout>
      {loading ? (
        <Loader />
      ) : (
        !applyQuestOnly && (
          <div className={styles.fetchMoreContainer}>
            <button
              id="loadMore"
              className={styles.fetchBtn}
              onClick={fetchQuests}
            >
              +
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default QuestList;
