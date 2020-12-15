import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { QuestInfoType } from "../types/Quest";
import { db } from "../services/firebase";
import userState from "../store/user";
import SiteNavbar from "../components/SiteNavbar";

import styles from "../styles/CreateQuest.module.scss";

interface Props {
  defaultQuest?: QuestInfoType;
  valid?: (edited: boolean) => void;
}

function CreateQuest(props: Props) {
  const user = useRecoilValue(userState);
  const { defaultQuest } = props;
  const [title, setTitle] = useState<string>(
    defaultQuest ? defaultQuest.title : ""
  );
  const [desc, setDesc] = useState<string>(
    defaultQuest ? defaultQuest.description : ""
  );
  const [levelMin, setLevelMin] = useState<number>(
    defaultQuest ? defaultQuest.levelMin : 1
  );
  const [levelMax, setLevelMax] = useState<number>(
    defaultQuest ? defaultQuest.levelMax : 20
  );
  const [wantedParticipants, setWantedParticipants] = useState<number>(
    defaultQuest ? defaultQuest.wantedParticipants : 1
  );
  const [questType, setQuestType] = useState<string>(
    defaultQuest ? (defaultQuest.private ? "private" : "public") : "public"
  );
  const [error, setError] = useState<string>("");

  const hist = useHistory();

  function createQuest() {
    const newQuest: QuestInfoType = {
      title,
      description: desc,
      levelMin,
      levelMax,
      wantedParticipants,
      private: questType === "private",
      participants: {},
      started: false,
      master: user.uid,
      date: new Date().toString(),
    };
    /* console.log("form: ", e.target.questImgName.files); */

    db.collection("quests")
      .add(newQuest)
      .then((qDoc) => {
        db.collection("quests")
          .doc(qDoc.id)
          .collection("rooms")
          .add({ title: "default", participants: [] })
          .then(() => {
            hist.push("/selection");
          });
      })
      .catch((e) => setError(e.message));
  }

  function editQuest() {
    if (defaultQuest && props.valid) {
      const edit: any = {
        title,
        description: desc,
        levelMin,
        levelMax,
        wantedParticipants,
        private: questType === "private",
      };

      db.collection("quests")
        .doc(defaultQuest.id)
        .update(edit)
        .then(() => {
          if (props.valid) props.valid(true);
        })
        .catch((e) => setError(e.message));
    }
  }

  const onSubmit = function (e: any) {
    e.preventDefault();
    if (!defaultQuest) createQuest();
    else editQuest();
  };

  return (
    <div className="content">
      <SiteNavbar />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la quête"
          className={styles.title}
        />
        <section className={styles.lvlRange}>
          Niveaux
          <input
            id=""
            type="number"
            name="levelMin"
            min="1"
            max="20"
            placeholder="Niveau minimum requis"
            value={levelMin}
            onChange={(e) => setLevelMin(parseInt(e.target.value))}
          />
          à
          <input
            id=""
            type="number"
            name="levelMax"
            min="1"
            max="20"
            placeholder="Niveau maximum requis"
            value={levelMax}
            onChange={(e) => setLevelMax(parseInt(e.target.value))}
          />
        </section>
        <textarea
          id=""
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={styles.desc}
          placeholder="Description de la quête + pré-requis"
        ></textarea>

        <div className={styles.nbParticipants}>
          <label htmlFor="nbParticipantsInput">Nombre de participants: </label>
          <input
            id="nbParticipantsInput"
            type="number"
            name="nbParticipants"
            min="1"
            value={wantedParticipants}
            onChange={(e) => setWantedParticipants(parseInt(e.target.value))}
          />
        </div>
        <section className={styles.questType}>
          Type de quête :<br />
          <label>
            <input
              id=""
              type="radio"
              value="public"
              checked={questType === "public"}
              onChange={(e) => setQuestType(e.target.value)}
            />
            Publique
          </label>
          <label>
            <input
              id=""
              type="radio"
              value="private"
              checked={questType === "private"}
              onChange={(e) => setQuestType(e.target.value)}
            />
            Privée
          </label>
        </section>
        <div className={styles.submitBtns}>
          <input
            type="submit"
            value={defaultQuest ? "Valider les changements" : "Créer la quête"}
          />
          {defaultQuest && (
            <button
              className={styles.cancelBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (props.valid) props.valid(false);
              }}
            >
              Annuler les changements
            </button>
          )}
        </div>
      </form>
      <span>{error}</span>
    </div>
  );
}

export default CreateQuest;
