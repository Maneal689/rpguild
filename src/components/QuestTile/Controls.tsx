import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { QuestInfoType } from "../../types/Quest";
import userState from "../../store/user";
import characterState from "../../store/character";
import {
  applyToQuest,
  unapplyToQuest,
  isApplied,
  validPToQuest,
} from "../../helpers/quest";

import styles from "./style.module.scss";

interface Props {
  quest: QuestInfoType;
  questList: QuestInfoType[];
  dispatchQuest: any;
}

function Controls(props: Props) {
  const { quest, dispatchQuest } = props;
  const user = useRecoilValue(userState);
  const status =
    user.uid in quest.participants ? quest.participants[user.uid].status : null;
  const character = useRecoilValue(characterState);
  const [loading, setLoading] = useState<boolean>(false);
  const hist = useHistory();
  const applied = character.id ? isApplied(quest, character.id) : false;

  const appliedQuestList = useMemo<QuestInfoType[]>(() => {
    return props.questList.filter((q) =>
      character.id ? isApplied(q, character.id) : false
    );
  }, [character.id, props.questList]);

  const unapply = function () {
    setLoading(true);
    unapplyToQuest(quest, user.uid).then(() => {
      dispatchQuest({
        type: "UNAPPLY",
        payload: {
          questId: quest.id,
          userId: user.uid,
        },
      });
      setLoading(false);
    });
  };

  const apply = function () {
    if (character.id) {
      setLoading(true);
      applyToQuest(quest, user.uid, character.id).then(() => {
        dispatchQuest({
          type: "APPLY",
          payload: {
            questId: quest.id,
            userId: user.uid,
            characterId: character.id,
          },
        });
        setLoading(false);
      });
    }
  };

  const valid = function () {
    setLoading(true);
    validPToQuest(quest, appliedQuestList, user.uid).then(() => {
      dispatchQuest({
        type: "VALID",
        payload: {
          questId: quest.id,
          appliedQuestList,
          userId: user.uid,
        },
      });
      setLoading(false);
      hist.push(`/quest/${quest.id}`);
    });
  };

  if (loading) return <><i className={`fas fa-spinner fa-spin ${styles.disabled}`} /></>;
  else if (
    user.uid in quest.participants &&
    quest.participants[user.uid].character !== character.id
  )
    return (
      <>
        <i className={`fas fa-ban ${styles.disabled}`} />
      </>
    );
  else if (applied && status) {
    if (status === "pending")
      return (
        <>
          <i className={`fas fa-hourglass-half ${styles.disabled}`} />
          <button onClick={unapply}>
            <i className={`fas fa-ban ${styles.red}`} />
          </button>
        </>
      );
    else if (status === "accepted")
      return (
        <>
          <button onClick={valid}>
            <i className={`far fa-check-circle ${styles.green}`} />
          </button>
          <button onClick={unapply}>
            <i className={`fas fa-ban ${styles.red}`} />
          </button>
        </>
      );
    else if (status === "rejected")
      return (
        <>
          <i className={`far fa-times-circle ${styles.disabled}`} />
        </>
      );
    else if (status === "member")
      return (
        <>
          <i className={`far fa-check-circle ${styles.disabled}`} />
        </>
      );
  }
  // if (!applied)
  return (
    <>
      <button onClick={apply}>
        <i className={`fab fa-telegram-plane ${styles.green}`} />
      </button>
    </>
  );
}

export default Controls;
