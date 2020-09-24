import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import QuestTile from "./QuestTile";
import { QuestInfoType } from "../../types/Quest";

interface Props {
  questList: QuestInfoType[];
  dispatchQuest: any;
}

function SelectedQuestTileWrapper(props: Props) {
  const { questList, dispatchQuest } = props;
  const { id: selectedQuestId } = useParams();

  const selectedQuest = useMemo<QuestInfoType | null>(() => {
    for (let q of questList) {
      if (q.id === selectedQuestId) return q;
    }
    return null;
  }, [questList, selectedQuestId]);
  if (selectedQuest)
    return (
      <QuestTile
        quest={selectedQuest}
        questList={questList}
        dispatchQuest={dispatchQuest}
        fullscreen
      />
    );
  return null;
}

export default SelectedQuestTileWrapper
