export type MessageType = {
  id?: string;
  author: string; // userId
  authorized: string[]; // userId list
  content: string;
  type: "user" | "system";
  date: string;
}

export type RoomType = {
  id?: string;
  title: string;
  participants: string[]; // userId list
  messages?: MessageType[];
}

export type QuestParticipantStatusType = "pending" | "accepted" | "rejected" | "member" | undefined;

export type QuestInfoType = {
  id?: string;
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
  rooms?: RoomType[];
};
