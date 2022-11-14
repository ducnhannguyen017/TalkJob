import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type TaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerTask = {
  readonly id: string;
  readonly name: string;
  readonly code?: string | null;
  readonly processStep?: number | null;
  readonly description?: string | null;
  readonly projectID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTask = {
  readonly id: string;
  readonly name: string;
  readonly code?: string | null;
  readonly processStep?: number | null;
  readonly description?: string | null;
  readonly projectID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task, TaskMetaData>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task, TaskMetaData>) => MutableModel<Task, TaskMetaData> | void): Task;
}

type EagerProject = {
  readonly id: string;
  readonly nam: string;
  readonly Owner?: User | null;
  readonly Members?: (User | null)[] | null;
  readonly Tasks?: (Task | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly projectOwnerId?: string | null;
}

type LazyProject = {
  readonly id: string;
  readonly nam: string;
  readonly Owner: AsyncItem<User | undefined>;
  readonly Members: AsyncCollection<User>;
  readonly Tasks: AsyncCollection<Task>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly projectOwnerId?: string | null;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project, ProjectMetaData>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string | null;
  readonly status?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatRooms?: (ChatRoomUser | null)[] | null;
  readonly projectID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string | null;
  readonly status?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatRooms: AsyncCollection<ChatRoomUser>;
  readonly projectID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerMessage = {
  readonly id: string;
  readonly content: string;
  readonly userID: string;
  readonly chatroomID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly content: string;
  readonly userID: string;
  readonly chatroomID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message, MessageMetaData>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

type EagerChatRoom = {
  readonly id: string;
  readonly newMessages?: number | null;
  readonly Members?: (ChatRoomUser | null)[] | null;
  readonly LastMessage?: Message | null;
  readonly Messages?: (Message | null)[] | null;
  readonly Owner?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
  readonly chatRoomOwnerId?: string | null;
}

type LazyChatRoom = {
  readonly id: string;
  readonly newMessages?: number | null;
  readonly Members: AsyncCollection<ChatRoomUser>;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly Messages: AsyncCollection<Message>;
  readonly Owner: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
  readonly chatRoomOwnerId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom, ChatRoomMetaData>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

type EagerChatRoomUser = {
  readonly id: string;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoomUser = {
  readonly id: string;
  readonly user: AsyncItem<User>;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoomUser = LazyLoading extends LazyLoadingDisabled ? EagerChatRoomUser : LazyChatRoomUser

export declare const ChatRoomUser: (new (init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>) => ChatRoomUser) & {
  copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}