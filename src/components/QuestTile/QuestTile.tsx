import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";

import Controls from "./Controls";

import userState from "../../store/user";
import { QuestInfoType } from "../../types/Quest";

import styles from "./style.module.scss";

interface Props {
  quest: QuestInfoType;
  questList: QuestInfoType[];
  dispatchQuest: any;
}

function QuestTile(props: Props) {
  const { quest, dispatchQuest } = props;
  const user = useRecoilValue(userState);

  const nbMember = useCallback((quest) => {
    return Object.keys(quest.participants).reduce(
      (res, userId) =>
        quest.participants[userId].status === "member" ? res + 1 : res,
      0
    );
  }, []);

  return (
    <li className={`${styles.questTile}`}>
      <div className={styles.image}>IMG</div>
      <div className={styles.content}>
        <h2>{quest.title}</h2>
        <section>
          <span className={styles.date}>
            Le {quest.date && format(new Date(quest.date), "dd/LL/yyyy")}
          </span>
          <span className={styles.lvlRange}>
            Niveaux <strong>{quest.levelMin}</strong> à{" "}
            <strong>{quest.levelMax}</strong>
          </span>
        </section>
        <section>
          <span className={styles.userCount}>
            <i className="far fa-user" />
            {nbMember(quest)} / {quest.wantedParticipants}
          </span>
          <span className={styles.controls}>
            <Controls
              quest={quest}
              questList={props.questList}
              dispatchQuest={dispatchQuest}
            />
          </span>
        </section>
      </div>
    </li>
  );
}

export default QuestTile;
