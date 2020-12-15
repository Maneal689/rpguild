import React, { useState, ReactNode } from "react";
import styled from "styled-components";

import { db } from "../../services/firebase";
import { QuestInfoType, QuestParticipantStatusType } from "../../types/Quest";

import Icon from "../../styles/Icon.styled";

const Container = styled.div``;

const Control = styled.button`
  background: none;
  border: none;
`;

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

  let controls: ReactNode = <Icon className="far fa-check-circle" disabled />;

  if (loading) controls = <Icon className="fas fa-spinner fa-spin" />;
  else if (status === "pending")
    controls = (
      <>
        <Control onClick={accept}>
          <Icon className="far fa-check-circle" green activable />
        </Control>
        <Control onClick={reject}>
          <Icon className="far fa-times-circle" red activable />
        </Control>
      </>
    );
  else if (status === "accepted")
    controls = <Icon className="fas fa-hourglass-half" disabled />;
  else if (status === "rejected")
    controls = (
      <Control onClick={undoReject}>
        <Icon className="fas fa-ban" red activable />
      </Control>
    );
  return <Container>{controls}</Container>;
}

export default Controls;
