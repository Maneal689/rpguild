import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

import { db } from "../services/firebase";
import { QuestInfoType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";
import userState from "../store/user";
import characterState from "../store/character";

import CreateQuest from "./CreateQuest";
import CharacterTile from "../components/CharacterTile";
import SiteNavbar from "../components/SiteNavbar";

import styles from "../styles/ApplyQuest.module.scss";

const ApplyQuest = function () {
  const user = useRecoilValue(userState);
  const character = useRecoilValue(characterState);
  const { id: questId } = useParams();
  const hist = useHistory();

  const [quest, setQuest] = useState<QuestInfoType | null>(null);
  const [participants, setParticipants] = useState<{
    [userId: string]: CharacterDataType;
  }>({});
  const [loadingParticipants, setLoadingParticipants] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const isMaster = useMemo(
    () => (quest ? user.uid === quest.master && character.id === null : true),
    [character.id, quest, user.uid]
  );

  const [edit, setEdit] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const initData = useCallback(() => {
    const promise = db.collection("quests").doc(questId).get();
    promise
      .then((questDoc) => {
        setQuest(
          Object.assign({ id: questDoc.id }, questDoc.data() as QuestInfoType)
        );
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
    return promise;
  }, [questId]);

  // Redirect if character selected or not master
  useEffect(() => {
    if (
      (!character.loading && character.id) ||
      !isMaster ||
      (quest && quest.started)
    ) {
      if (character.id) hist.replace("/quest/lists");
      else if (quest && quest.started) hist.replace(`/quest/${quest.id}`);
      else hist.replace("/selection");
    }
  }, [character.id, character.loading, hist, isMaster, quest]);

  // Get quest informations
  useEffect(() => {
    initData();
  }, [initData]);

  // Get all participant informations
  useEffect(() => {
    if (quest) {
      const { participants: pList } = quest as QuestInfoType;
      let promises: Promise<any>[] = [];
      // Get all participants character info
      Object.keys(pList).forEach((userId) => {
        const participant = pList[userId];
        const promise = db
          .collection("users")
          .doc(userId)
          .collection("characters")
          .doc(participant.character)
          .get();

        promise.then((characterDoc) => {
          setParticipants((old: any) =>
            Object.assign({}, old, {
              [userId]: {
                id: characterDoc.id,
                status: participant.status,
                ...(characterDoc.data() as CharacterDataType),
              },
            })
          );
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        setLoadingParticipants(false);
      });
    }
  }, [isMaster, quest, user.uid]);

  const startQuest = useCallback(() => {
    if (quest) {
      db.collection("quests")
        .doc(quest.id)
        .update({ started: true })
        .then(() => {
          hist.replace(`/quest/${quest.id}`);
        });
    }
  }, [hist, quest]);

  if (quest && edit)
    return (
      <CreateQuest
        defaultQuest={quest}
        valid={(edited) => {
          setEdit(false);
          if (edited) initData();
        }}
      />
    );

  return (
    <div className="content">
      <SiteNavbar />
      {quest && (
        <>
          <AnimatePresence>
            {shareModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shareModal}
                onClick={() => setShareModal(false)}
              >
                <div
                  className={styles.shareContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShareModal(false)}
                    className={styles.quitBtn}
                    dangerouslySetInnerHTML={{ __html: "&times;" }}
                  ></button>
                  Partagez ce lien pour que vos amis puissent envoyer leur
                  candidature:
                  <br />
                  <code>
                    {`${window.location.protocol}//${window.location.hostname}/quest/lists/${quest.id}`}
                  </code>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <h1 className={styles.title}>
            {quest.title}
            <section className={styles.btns}>
              <button className={styles.editBtn} onClick={() => setEdit(true)}>
                <i className="fas fa-cog" />
              </button>
              <button
                className={styles.editBtn}
                onClick={() => setShareModal(true)}
              >
                <i className="fas fa-share-alt" />
              </button>
            </section>
          </h1>
          <section className={styles.lvndate}>
            <span className={styles.lvlRange}>
              Niveaux <strong>{quest.levelMin}</strong> à{" "}
              <strong>{quest.levelMax}</strong>
            </span>
            <span className={styles.date}>
              Le {quest.date && format(new Date(quest.date), "dd/LL/yyyy")}
            </span>
          </section>
          <p className={styles.desc}>{quest.description}</p>
          <ul>
            {Object.keys(participants).length === 0 && (
              <div>Il n'y a pas encore de participants</div>
            )}
            {Object.keys(participants).map((userId, index) => (
              <CharacterTile
                userId={userId}
                quest={quest as QuestInfoType}
                participant={participants[userId]}
                key={index}
                fetchData={initData}
              />
            ))}
          </ul>
          {loadingParticipants && "loading..."}
          <div className={styles.center}>
            <button className={styles.startBtn} onClick={startQuest}>
              Lancer la quête
            </button>
          </div>
          <span>{error}</span>
        </>
      )}
    </div>
  );
};

export default ApplyQuest;
