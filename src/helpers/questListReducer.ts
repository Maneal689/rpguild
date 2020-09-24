import { QuestInfoType } from "../types/Quest";

export const defaultQuestState: QuestInfoType[] = [];

export function questReducer(state: QuestInfoType[], action: any) {
  function unapply(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }
    if (questIndex !== -1) {
      newQuest = Object.assign({}, oState[questIndex]);
      delete newQuest.participants[action.payload.userId];
      return [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
    } else return oState;
  }

  function apply(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }

    if (questIndex !== -1) {
      newQuest = Object.assign({}, oState[questIndex]);
      newQuest.participants[action.payload.userId] = {
        status: "pending",
        character: action.payload.characterId,
      };
      return [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
    } else return oState;
  }

  function valid(oState: QuestInfoType[], questId: string) {
    let questIndex = -1;
    let newQuest = null;

    for (let i = 0; i < oState.length && questIndex === -1; i++) {
      if (oState[i].id === questId) questIndex = i;
    }
    if (questIndex !== -1) {
      const characterId =
        oState[questIndex].participants[action.payload.userId].character;
      newQuest = Object.assign({}, oState[questIndex]);
      newQuest.participants[action.payload.userId] = {
        status: "member",
        character: characterId,
      };
      let newState = [
        ...oState.slice(0, questIndex),
        newQuest,
        ...oState.slice(questIndex + 1),
      ];
      for (let q of action.payload.appliedQuestList) {
        if (q.id !== questId) newState = unapply(newState, q.id);
      }
      return newState;
    } else return oState;
  }

  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [...state, ...action.payload];
    case "APPLY":
      return apply(state, action.payload.questId);
    case "UNAPPLY":
      return unapply(state, action.payload.questId);
    case "VALID":
      return valid(state, action.payload.questId);

    default:
      return state;
  }
}
