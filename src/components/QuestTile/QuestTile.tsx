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
  master?: boolean;
}

function QuestTile(props: Props) {
  const { quest, dispatchQuest, master } = props;
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
      layout
      layoutId={`quest-tile-${quest.id}-${props.fullscreen ? "f" : "t"}`}
      className={`${styles.questTile} ${
        props.fullscreen ? styles.fullscreen : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        if (props.fullscreen) hist.push("/quest/lists");
      }}
    >
      <motion.div
        className={styles.container}
        layoutId={`quest-container-${quest.id}`}
        layout
        onClick={(e) => {
          if (master) {
            if (quest.started) hist.push(`/quest/${quest.id}`);
            else hist.push(`/quest/apply/${quest.id}`);
          } else if (!props.fullscreen) hist.push(`/quest/lists/${quest.id}`);
          e.stopPropagation();
        }}
      >
        {props.fullscreen && (
          <motion.button
            className={styles.quit}
            dangerouslySetInnerHTML={{ __html: "&times;" }}
            onClick={() => hist.push("/quest/lists")}
          />
        )}
        <motion.div
          layout
          className={styles.image}
          layoutId={`quest-img-${quest.id}`}
        >
          IMG
        </motion.div>
        <motion.div
          className={styles.content}
          layoutId={`quest-infos-${quest.id}`}
          layout
        >
          <motion.h2 layout layoutId={`quest-title-${quest.id}`}>
            {quest.title}
          </motion.h2>
          <motion.section layout layoutId={`quest-lvndate-${quest.id}`}>
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
            layout
          >
            {props.fullscreen && <p>{quest.description}</p>}
          </motion.section>
          <motion.section layoutId={`quest-controls-${quest.id}`} layout>
            <span className={styles.userCount}>
              <i className="far fa-user" />
              {nbMember(quest)} / {quest.wantedParticipants}
            </span>
            <span className={styles.controls}>
              {!master && (
                <Controls
                  quest={quest}
                  questList={props.questList}
                  dispatchQuest={dispatchQuest}
                />
              )}
            </span>
          </motion.section>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}

export default QuestTile;
