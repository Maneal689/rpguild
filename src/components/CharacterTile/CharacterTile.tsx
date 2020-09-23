import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import userState from "../../store/user";
import characterState from "../../store/character";
import { QuestInfoType } from "../../types/Quest";
import { CharacterDataType } from "../../types/Character";

import Controls from "./Controls";

interface Props {
  userId: string;
  participant: CharacterDataType;
  quest: QuestInfoType;
  fetchData: () => Promise<any>;
}

function CharacterTile(props: Props) {
  const { quest, participant, userId } = props;
  const user = useRecoilValue(userState);
  const character = useRecoilValue(characterState);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isMaster = user.uid === quest.master && character.id === null;

  return (
    <li>
      {participant.name} lv. {participant.level}
      <br />
      {loading
        ? "loading..."
        : isMaster && (
            <Controls
              status={participant.status}
              userId={userId}
              quest={quest}
              fetchData={props.fetchData}
            />
          )}
      <span>{error}</span>
    </li>
  );
}

export default CharacterTile;
