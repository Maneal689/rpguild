import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useRecoilValue } from "recoil";

import { db } from "../../services/firebase";
import { QuestInfoType, RoomType, MessageType } from "../../types/Quest";
import { CharacterDataType } from "../../types/Character";
import UserState from "../../store/user";

interface Props {
  quest: QuestInfoType;
  rooms: RoomType[];
  messages: {
    [roomId: string]: MessageType[];
  };
  characters: {
    [userId: string]: CharacterDataType;
  };
}

function QuestRooms(props: Props) {
  const { quest, rooms, messages, characters } = props;
  const user = useRecoilValue(UserState);
  const [roomIndex, setRoomIndex] = useState<number>(-1);
  const [msg, setMsg] = useState("");
  const lastRoomLength = useRef(rooms.length);

  // Set default room as active one
  useEffect(() => {
    if (rooms.length !== lastRoomLength.current) {
      lastRoomLength.current = rooms.length;
      rooms.forEach((room, index) => {
        if (room.title === "default") setRoomIndex(index);
      });
    }
  }, [rooms]);

  const room = useMemo<RoomType | null>(() => {
    if (roomIndex !== -1) return rooms[roomIndex];
    return null;
  }, [rooms, roomIndex]);

  const msgList = useMemo<MessageType[]>(() => {
    if (room && room.id) return messages[room.id] ? messages[room.id] : [];
    return [];
  }, [messages, room]);

  const sendMsg = useCallback(
    (e) => {
      e.preventDefault();
      if (room) {
        let newMsg: MessageType = {
          date: new Date().toString(),
          type: "user",
          author: user.uid,
          authorized: room.participants, // TODO: Select participants
          content: msg,
        };
        db.collection("quests")
          .doc(quest.id)
          .collection("rooms")
          .doc(room.id)
          .collection("messages")
          .add(newMsg)
          .then(() => setMsg(""));
      }
    },
    [msg, quest.id, room, user.uid]
  );

  return (
    <div>
      <h1>{quest.title}</h1>
      {rooms.map((room, index) => (
        <div onClick={() => setRoomIndex(index)} key={index}>
          <strong>{room.title}</strong>
        </div>
      ))}
      {msgList.map((msg, index) => (
        <p key={index}>{msg.content}</p>
      ))}

      <form onSubmit={sendMsg}>
        <input
          type="text"
          name="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default QuestRooms;
