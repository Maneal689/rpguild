import React, { useState } from "react";

import { db } from "../../services/firebase";
import { QuestInfoType, QuestParticipantStatusType } from "../../types/Quest";

interface Props {
  quest: QuestInfoType;
  status: QuestParticipantStatusType;
  userId: string;
  fetchData: () => Promise<any>;
}

function Controls(props: Props) {
  const { quest, status, userId, fetchData } = props;
  const [loading, setLoading] = useState();

  const accept = function (): void {
    let res = Object.assign({}, quest.participants);
    res[userId].status = "accepted";
    setLoading(true);
    db.collection("quests")
      .doc(quest.id)
      .update({ participants: res })
      .then(() => {
        fetchData().then(() => {
          setLoading(false);
        });
      });
  };

  const reject = function (): void {
    let res = Object.assign({}, quest.participants);
    res[userId].status = "rejected";
    setLoading(true);
    db.collection("quests")
      .doc(quest.id)
      .update({ participants: res })
      .then(() => {
        props.fetchData().then(() => {
          setLoading(false);
        });
      });
  };

  const undoReject = function (): void {
    let res = Object.assign({}, quest.participants);
    res[userId].status = "pending";
    setLoading(true);
    db.collection("quests")
      .doc(quest.id)
      .update({ participants: res })
      .then(() => {
        props.fetchData().then(() => {
          setLoading(false);
        });
      });
  };

  if (loading) return <div>loading...</div>;
  else if (status === "pending")
    return (
      <div>
        <button onClick={accept}>Accepter</button>
        <button onClick={reject}>Refuser</button>
      </div>
    );
  else if (status === "accepted")
    return <div>Accepté: En attente de la réponse du joueur.</div>;
  else if (status === "rejected")
    return (
      <div>
        <button onClick={undoReject}>Annuler le refus</button>
      </div>
    );
  else return <div>Membre validé</div>;
}

export default Controls;
