/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable consistent-return */
import moment from 'moment-timezone';
import realTime from './firebase-settings';

const parse = (snapshot: any) => {
  const { createdAt, text, user } = snapshot.val();
  const { key: _id } = snapshot;
  const message = { _id, createdAt, text, user };
  return message;
};

const realTimeManager = {
  findUser: async (name: any) => {
    const user = await realTime
      .database()
      .ref('users')
      .orderByChild('name')
      .equalTo(name)
      .once('value');

    if (user.exists()) {
      return Object.values(user.val())[0];
    }

    return null;
  },

  saveUser: async (user: any) => {
    realTime.database().ref('users').push(user);
  },

  saveMessage: async (message: any) => {
    realTime.database().ref('messages').push(message);
  },

  updateMessages: async (callback: any) => {
    realTime
      .database()
      .ref('messages')
      .limitToLast(20)
      .on('child_added', (snapshot) => {
        callback(parse(snapshot));
      });
  },
};

export const sanitizeObjectToArray = (obj: any) => {
  const verify = !obj || !obj.length <= 0;
  if (verify) return [];

  return Object.entries(obj)
    .sort()
    .map((item: any) => ({
      id: item[0],
      ...item[1],
    }));
};

export const getParticipantUID = (userUID: string, participants: any) =>
  Object.keys(participants).filter((i) => i !== userUID);

export class ChatService {
  static async getChat(chatId: string) {
    try {
      const chat = await realTime
        .database()
        .ref(`/chats/${chatId}`)
        .once('value');

      return chat.val();
    } catch (error) {
      console.log('ChatService.getChat', error);
    }
  }

  static async getChatParticipant(chatId: string, participantUID: string) {
    const participant = await realTime
      .database()
      .ref(`/chats/${chatId}/participants/${participantUID}`)
      .once('value');

    return participant.val();
  }

  static async getChatMessage(
    chatId: string,
    endAt: string = moment().format('X'),
    limit: number = 15
  ) {
    try {
      const messages = await realTime
        .database()
        .ref(`messages/${chatId}`)
        .orderByChild('sendAt')
        .endAt(endAt)
        .limitToLast(limit)
        .once('value');

      return sanitizeObjectToArray(messages.val());
    } catch (error) {
      console.log('ChatService.getChatMessage', error);
    }
  }

  static async createChatMessage({
    myUID,
    chatId,
    content,
    idSender,
  }: models.CreateChatType) {
    const newChatMessageRef = realTime
      .database()
      .ref(`messages/${chatId}`)
      .push();

    const chat = await this.getChat(chatId);
    const otherParticipantUID = getParticipantUID(myUID, chat.participants)[0];
    const otherParticipantDetail = await this.getChatParticipant(
      chatId,
      otherParticipantUID
    );

    const updatedAtFormatted = moment().utc().format();

    if (moment(updatedAtFormatted).isAfter(otherParticipantDetail.lastViewed)) {
      await realTime
        .database()
        .ref(`/chats/${chatId}/participants/${otherParticipantUID}`)
        .update({
          unseenCount: otherParticipantDetail.unseenCount + 1,
          lastViewed: updatedAtFormatted,
        });
    }

    const updatedAt = moment().utc().format('X');
    const message = {
      content,
      idSender,
      sendAt: updatedAt,
      sendAtFormatted: updatedAtFormatted,
    };

    await realTime.database().ref(`/chats/${chatId}`).update({
      lastMessage: message,
      updatedAt,
      updatedAtFormatted,
    });

    return newChatMessageRef.set({ ...message });
  }

  static async updateChatParticipant(myUID: string, chatId: string) {
    await realTime
      .database()
      .ref(`/chats/${chatId}/participants/${myUID}`)
      .update({
        unseenCount: 0,
        lastViewed: moment().format(),
      });
  }

  static async subscribeOnChatMessages(chatId: string, callback: any) {
    return realTime
      .database()
      .ref(`messages/${chatId}`)
      .limitToLast(1)
      .on('child_added', (snapshot) =>
        callback({
          ...snapshot.val(),
          id: snapshot.key,
        })
      );
  }

  static async subscribeOnUserChats(userId: string, callback: any) {
    realTime
      .database()
      .ref('chats')
      .orderByChild(`participants/${userId}/onChat`)
      .equalTo(true)
      .on('child_added', (snapshot) =>
        callback({
          ...snapshot.val(),
          id: snapshot.key,
        })
      );

    realTime
      .database()
      .ref('chats')
      .orderByChild(`participants/${userId}/onChat`)
      .equalTo(true)
      .on('child_changed', (snapshot) =>
        callback({
          ...snapshot.val(),
          id: snapshot.key,
        })
      );
  }

  static async unsubscribeOnChatMessages(chatId: string) {
    realTime.database().ref(`messages/${chatId}`).off('child_added');
  }
}

export default realTimeManager;
