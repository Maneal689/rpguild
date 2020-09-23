import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

import Controls from "./Controls";

import userState from "../../store/user";
import { QuestInfoType } from "../../types/Quest";

import styles from "./style.module.scss";

interface Props {
  quest: QuestInfoType;
  questList: QuestInfoType[];
  dispatchQuest: any;
  fullscreen?: boolean;
}

function QuestTile(props: Props) {
  const { quest, dispatchQuest } = props;
  const user = useRecoilValue(userState);
  const hist = useHistory();

  const nbMember = useCallback((quest) => {
    return Object.keys(quest.participants).reduce(
      (res, userId) =>
        quest.participants[userId].status === "member" ? res + 1 : res,
      0
    );
  }, []);

  return (
    <motion.li
      layoutId={`quest-tile-${quest.id}-${props.fullscreen ? "f" : "t"}`}
      className={`${styles.questTile} ${
        props.fullscreen ? styles.fullscreen : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        hist.push("/quest/lists");
      }}
    >
      <motion.div
        className={styles.container}
        layoutId={`quest-container-${quest.id}`}
        onClick={(e) => {
          if (!props.fullscreen) hist.push(`/quest/lists/${quest.id}`);
          e.stopPropagation();
        }}
      >
        <motion.div className={styles.image} layoutId={`quest-img-${quest.id}`}>
          IMG
        </motion.div>
        <motion.div
          className={styles.content}
          layoutId={`quest-infos-${quest.id}`}
        >
          <motion.h2 layoutId={`quest-title-${quest.id}`}>
            {quest.title}
          </motion.h2>
          <motion.section layoutId={`quest-lvndate-${quest.id}`}>
            <span className={styles.lvlRange}>
              Niveaux <strong>{quest.levelMin}</strong> à{" "}
              <strong>{quest.levelMax}</strong>
            </span>
            <span className={styles.date}>
              Le {quest.date && format(new Date(quest.date), "dd/LL/yyyy")}
            </span>
          </motion.section>
          <motion.section
            className={styles.desc}
            layoutId={`quest-desc-${quest.id}`}
          >
            {props.fullscreen && <p>{quest.description}</p>}
          </motion.section>
          <motion.section layoutId={`quest-controls-${quest.id}`}>
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
          </motion.section>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}

export default QuestTile;
