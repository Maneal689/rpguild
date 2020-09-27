import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useHistory, useParams } from "react-router-dom";

import { db } from "../services/firebase";
import { QuestInfoType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";
import userState from "../store/user";
import characterState from "../store/character";

import CharacterTile from "../components/CharacterTile";
import SiteNavbar from "../components/SiteNavbar";

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

  return (
    <div className="content">
      <SiteNavbar />
      {quest && (
        <>
          <p>{quest.description}</p>
          Tranche de niveaux: {quest.levelMin} - {quest.levelMax}
          <br />
          <ul>
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
          <button onClick={startQuest}>Lancer la quête</button>
          <span>{error}</span>
        </>
      )}
    </div>
  );
};

export default ApplyQuest;
