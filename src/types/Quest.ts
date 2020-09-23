export type QuestParticipantStatusType = "pending" | "accepted" | "rejected" | "member" | undefined;

export type QuestInfoType = {
  title: string;
  description: string;
  levelMin: number;
  levelMax: number;
  date: string;
  wantedParticipants: number;
  participants: {
    [userId: string]: {
      character: string;
      status: QuestParticipantStatusType;
    };
  };
  private: boolean;
  started: boolean;
  master: string;
  id?: string;
};
