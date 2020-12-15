import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, useHistory } from "react-router-dom";

import { QuestInfoType, RoomType, MessageType } from "../types/Quest";
import { CharacterDataType } from "../types/Character";
import userState from "../store/user";
import characterState from "../store/character";
import SiteNavbar from "../components/SiteNavbar";
import QuestRooms from "../components/QuestRooms";
import Content from "../styles/Content.styled";

import { db } from "../services/firebase";

const Quest = function () {
  const { id: questId } = useParams();
  const user = useRecoilValue(userState);
  const character = useRecoilValue(characterState);

  const [quest, setQuest] = useState<QuestInfoType | null>(null);
  const [characters, setCharacters] = useState<{
    [userId: string]: CharacterDataType;
  }>({});
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [messages, setMessages] = useState<{ [roomId: string]: MessageType[] }>(
    {}
  );
  const [loadingQuest, setLoadingQuest] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const hist = useHistory();

  const isMaster = quest && user.uid === quest.master && character.id === null;

  // Redirect if not master or participant or quest isn't started
  useEffect(() => {
    if (!loadingQuest && quest) {
      const characterList: string[] = Object.keys(quest.participants)
        .filter((userId) => quest.participants[userId].status === "member")
        .map((userId) => quest.participants[userId].character);
      if (
        !isMaster &&
        (!character.id || characterList.indexOf(character.id) === -1)
      )
        hist.replace("/quest/lists");
    }
  }, [character.id, hist, isMaster, loadingQuest, quest]);

  // Get quest informations
  useEffect(() => {
    db.collection("quests")
      .doc(questId)
      .get()
      .then((questDoc) => {
        setQuest({
          id: questDoc.id,
          ...(questDoc.data() as QuestInfoType),
        });
        setLoadingQuest(false);
      })
      .catch((err) => setError(err.message));
  }, [questId]);

  //Subscribe to characters
  useEffect(() => {
    if (quest) {
      let unsubscribers: any[] = [];
      for (let userId in quest.participants) {
        let characterId = quest.participants[userId].character;
        let unsubscribe = db
          .collection("users")
          .doc(userId)
          .collection("characters")
          .doc(characterId)
          .onSnapshot((characterDoc) => {
            setCharacters((old) =>
              Object.assign({}, old, {
                [userId]: {
                  id: characterDoc.id,
                  ...(characterDoc.data() as CharacterDataType),
                },
              })
            );
          });
        unsubscribers.push(unsubscribe);
      }
      return () => {
        for (let unsubscribe of unsubscribers) unsubscribe();
      };
    }
  }, [quest]);

  //Load rooms
  useEffect(() => {
    if (!user.loading && user.uid) {
      db.collection("quests")
        .doc(questId)
        .collection("rooms")
        .where("participants", "array-contains", user.uid)
        .get()
        .then((roomDocList) => {
          let rooms: RoomType[] = [];
          roomDocList.forEach((roomDoc) => {
            rooms.push({
              id: roomDoc.id,
              ...(roomDoc.data() as RoomType),
            });
          });
          setRooms(rooms);
        })
        .catch((err) => setError(err.message));
    }
  }, [questId, user]);

  // Subscribe to messages
  useEffect(() => {
    let unsubscribers: any[] = [];
    rooms.forEach((room) => {
      if (room.id) {
        let unsubscribe = db
          .collection("quests")
          .doc(questId)
          .collection("rooms")
          .doc(room.id)
          .collection("messages")
          .where("authorized", "array-contains", user.uid)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                setMessages((old) => {
                  if (room.id) {
                    let messages = old[room.id] ? old[room.id] : [];
                    const newMsg = {
                      id: change.doc.id,
                      ...(change.doc.data() as MessageType),
                    };
                    const newMsgList = [...messages.slice(), newMsg];
                    return Object.assign({}, old, { [room.id]: newMsgList });
                  }
                  return old;
                });
              } else if (change.type === "modified") {
                setMessages((old) => {
                  if (room.id) {
                    let messages = old[room.id] ? old[room.id] : [];
                    for (let i = 0; i < messages.length; i++) {
                      let msg = messages[i];
                      if (msg.id === change.doc.id) {
                        const newMsg = {
                          id: change.doc.id,
                          ...(change.doc.data() as MessageType),
                        };
                        const newMsgList = [
                          ...messages.slice(0, i),
                          newMsg,
                          ...messages.slice(i + 1),
                        ];

                        return Object.assign({}, old, {
                          [room.id]: newMsgList,
                        });
                      }
                    }
                  }
                  return old;
                });
              } else if (change.type === "removed") {
                setMessages((old) => {
                  if (room.id) {
                    let messages = old[room.id] ? old[room.id] : [];
                    for (let i = 0; i < messages.length; i++) {
                      let msg = messages[i];
                      if (msg.id === change.doc.id) {
                        const newMsgList = [
                          ...messages.slice(0, i),
                          ...messages.slice(i + 1),
                        ];

                        return Object.assign({}, old, {
                          [room.id]: newMsgList,
                        });
                      }
                    }
                  }
                  return old;
                });
              }
            });
          });
        unsubscribers.push(unsubscribe);
      }
    });
    return () => {
      for (let unsubscribe of unsubscribers) unsubscribe();
    };
  }, [questId, rooms, user.uid]);

  if (error)
    return (
      <Content>
        <SiteNavbar />
        <span>Oops! La quête n'a pas été trouvée...</span>
        <Link to="/quest/lists">Retour à la guilde</Link>
      </Content>
    );
  else if (quest)
    return (
      <Content>
        <SiteNavbar />
        <QuestRooms
          quest={quest}
          rooms={rooms}
          messages={messages}
          characters={characters}
        />
      </Content>
    );
  return <div className="content">loading...</div>;
};

export default Quest;
