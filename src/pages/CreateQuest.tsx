import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { QuestInfoType } from "../types/Quest";
import { db } from "../services/firebase";
import userState from "../store/user";

function CreateQuest() {
  const user = useRecoilValue(userState);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [levelMin, setLevelMin] = useState<number>(0);
  const [levelMax, setLevelMax] = useState<number>(20);
  const [wantedParticipants, setWantedParticipants] = useState<number>(0);
  const [questType, setQuestType] = useState<string>("public");
  const [error, setError] = useState<string>("");

  const hist = useHistory();

  const onSubmit = function (e: any) {
    e.preventDefault();
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
      .then(() => {
        hist.push("/selection");
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="content">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la quête"
        />
        <textarea
          id=""
          name="desc"
          cols={30}
          rows={10}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description de la quête + pré-requis"
        ></textarea>
        <input
          id=""
          type="number"
          name="levelMin"
          min="0"
          max="20"
          placeholder="Niveau minimum requis"
          value={levelMin}
          onChange={(e) => setLevelMin(parseInt(e.target.value))}
        />
        <input
          id=""
          type="number"
          name="levelMax"
          min="0"
          max="20"
          placeholder="Niveau maximum requis"
          value={levelMax}
          onChange={(e) => setLevelMax(parseInt(e.target.value))}
        />
        <input
          id=""
          type="number"
          name="nbParticipants"
          min="0"
          placeholder="Nombre de participants attendus"
          value={wantedParticipants}
          onChange={(e) => setWantedParticipants(parseInt(e.target.value))}
        />
        <label htmlFor="selectQuestType">
          Type de quête:{" "}
          <span title="Une quête privée ne sera pas suggérée aux autres joueurs, il vous faudra partager le lien de candidature aux différents joueurs.">
            i
          </span>
          <select
            id="selectQuestType"
            name="private"
            value={questType}
            onChange={(e) => setQuestType(e.target.value)}
          >
            <option value="public">Publique</option>
            <option value="private">Privée</option>
          </select>
        </label>
        <input type="submit" value="Créer la quête" />
      </form>
      <span>{error}</span>
    </div>
  );
}

export default CreateQuest;
