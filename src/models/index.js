// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "SENT": "SENT",
  "DELIVERED": "DELIVERED",
  "READ": "READ"
};

const { Task, Project, User, Message, ChatRoom, ChatRoomUser } = initSchema(schema);

export {
  Task,
  Project,
  User,
  Message,
  ChatRoom,
  ChatRoomUser,
  MessageStatus
};