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
      <div>IMG</div>
      <div>
        <h2>{quest.title}</h2>
        <section>
          <span>{quest.date && format(new Date(quest.date), "dd/LL/yyyy")}</span>
          <span>{quest.levelMin} - {quest.levelMax}</span>
        </section>
        <section>
          <span>
            {/* <FontAwesomeIcon icon={["fas", "user"]} size="sm" /> */}
            <i className="far fa-user" />
            {nbMember(quest)} / {quest.wantedParticipants}
          </span>
          <Controls
            quest={quest}
            questList={props.questList}
            dispatchQuest={dispatchQuest}
          />
        </section>
      </div>
    </li>
  );
}

export default QuestTile;
