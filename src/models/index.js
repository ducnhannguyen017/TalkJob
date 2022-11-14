// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Task, Project, User, Message, ChatRoom, ChatRoomUser } = initSchema(schema);

export {
  Task,
  Project,
  User,
  Message,
  ChatRoom,
  ChatRoomUser
};