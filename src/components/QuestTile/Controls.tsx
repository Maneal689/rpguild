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

interface Props {
  quest: QuestInfoType;
  questList: QuestInfoType[];
  dispatchQuest: any;
}

function Controls(props: Props) {
  const { quest, dispatchQuest } = props;
  const user = useRecoilValue(userState);
  const status = user.uid in quest.participants ? quest.participants[user.uid].status : null;
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

  if (loading) return <div>loading...</div>;
  else if (
    user.uid in quest.participants &&
    quest.participants[user.uid].character !== character.id
  )
    return <div>Vous avez déjà un personnage participant à cette quête</div>;
  else if (applied && status) {
    if (status === "pending")
      return (
        <div>
          En attente de la réponse du MJ
          <button onClick={unapply}>Annuler la candidature</button>
        </div>
      );
    else if (status === "accepted")
      return (
        <div>
          <button onClick={valid}>Valider participation</button>
          <button onClick={unapply}>Annuler la candidature</button>
        </div>
      );
    else if (status === "rejected") return <div>Rejeté</div>;
    else if (status === "member")
      return <div>Vous faites parti de la quête</div>;
  }
  // if (!applied)
  return (
    <div>
      <button onClick={apply}>Postuler</button>
    </div>
  );
}

export default Controls;
