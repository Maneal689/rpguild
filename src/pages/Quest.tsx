import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, useHistory } from "react-router-dom";

import { QuestInfoType } from "../types/Quest";
import userState from "../store/user";
import characterState from "../store/character";
import SiteNavbar from "../components/SiteNavbar";

import { db } from "../services/firebase";

const Quest = function () {
  const { id: questId } = useParams();
  const user = useRecoilValue(userState);
  const character = useRecoilValue(characterState);

  const [quest, setQuest] = useState<QuestInfoType | null>(null);
  const [loadingQuest, setLoadingQuest] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const hist = useHistory();

  const isMaster = quest && user.uid === quest.master && character.id === null;

  // Redirect if not master or participant if quest is started
  useEffect(() => {
    if (!loadingQuest && quest) {
      const characterList: string[] = Object.keys(quest.participants).map(
        (userId) => quest.participants[userId].character
      );
      if (
        !isMaster &&
        (!character.id || characterList.indexOf(character.id) === -1)
      )
        hist.replace("/quest/lists");
    }
  }, [character.id, hist, isMaster, loadingQuest, quest]);

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
      })
      .finally(() => setLoadingQuest(false));
    return promise;
  }, [questId]);

  // Get quest informations
  useEffect(() => {
    initData();
  }, [initData]);

  if (loadingQuest || user.loading || character.loading)
    return <div className="content">loading...</div>;
  else if (!loadingQuest && quest && !error)
    return (
      <div className="content">
        <SiteNavbar />
        {/*TODO: <QuestRoom /> */}
      </div>
    );
  return (
    <div className="content">
      <SiteNavbar />
      <span>Oops! La quête n'a pas été trouvée...</span>
      <Link to="/quest/lists">Retour à la guilde</Link>
    </div>
  );
};

export default Quest;
