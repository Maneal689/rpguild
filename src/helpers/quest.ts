import { db, firestore } from "../services/firebase";

import { QuestInfoType } from "../types/Quest";

export const isApplied = (quest: QuestInfoType, characterId: string) => {
  const characterList = Object.keys(quest.participants).map(
    (userId) => quest.participants[userId].character
  );
  return characterList.indexOf(characterId) !== -1;
};

export const applyToQuest = function (
  quest: QuestInfoType,
  userId: string,
  characterId: string
) {
  return db
    .collection("quests")
    .doc(quest.id)
    .update({
      participants: Object.assign({}, quest.participants, {
        [userId]: { status: "pending", character: characterId },
      }),
    });
};

export const unapplyToQuest = function (quest: QuestInfoType, userId: string) {
  const updateP = {
    [`participants.${userId}`]: firestore.FieldValue.delete(),
  };
  return db.collection("quests").doc(quest.id).update(updateP);
};

export const validPToQuest = function (
  quest: QuestInfoType,
  appliedQuestList: QuestInfoType[],
  userId: string
) {
  const characterId = quest.participants[userId].character;
  const newParticipants = Object.assign({}, quest.participants);
  newParticipants[userId].status = "member";
  let promises = [];
  let promiseQuest = db.collection("quests").doc(quest.id).update({
    participants: newParticipants,
  });
  let promiseChar = db
    .collection("users")
    .doc(userId)
    .collection("characters")
    .doc(characterId)
    .update({ currentQuest: quest.id })
    .then(() => { // Add user to default room participants
      return db
        .collection("quests")
        .doc(quest.id)
        .collection("rooms")
        .where("title", "==", "default")
        .get()
        .then((defaultRoomDoc) => {
          return db
            .collection("quests")
            .doc(quest.id)
            .collection("rooms")
            .doc(defaultRoomDoc.docs[0].id)
            .update({
              participants: firestore.FieldValue.arrayUnion(userId),
            });
        });
    });

  for (let q of appliedQuestList) {
    if (q.id !== quest.id) promises.push(unapplyToQuest(q, userId));
  }

  promises.push(promiseQuest);
  promises.push(promiseChar);

  return Promise.all(promises);
};
