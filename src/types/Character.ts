import { QuestParticipantStatusType } from "./Quest";

type InitCharacterType = {
  id: null;
  loading: true;
};

type NoCharacterType = {
  id: null;
  loading: false;
};

export type CharacterDataType = {
  id: string;
  loading?: false;
  status?: QuestParticipantStatusType; // Used in CharacterTile -> Controls
  name: string;
  level: number;
  currentQuest: string;
};

export type CharacterType =
  | InitCharacterType
  | NoCharacterType
  | CharacterDataType;
