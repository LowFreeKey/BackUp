import type { Principal } from '@dfinity/principal';
export type EssayCanister = Principal;
export interface EssayEntry {
  'title' : EssayTitle,
  'topic' : EssayTopic,
  'forgeVisits' : bigint,
  'essayOwner' : UserName,
  'createdAt' : bigint,
  'text' : string,
  'tokenCost' : bigint,
  'essayId' : EssayId,
}
export type EssayId = string;
export type EssayTitle = string;
export type EssayTopic = string;
export type UserName = string;
export type UserName__1 = string;
export interface kawak {
  'createUser' : (arg_0: UserName__1, arg_1: string) => Promise<
      [] | [EssayCanister]
    >,
  'forgeEssay' : (arg_0: EssayEntry, arg_1: bigint) => Promise<[] | [boolean]>,
  'submittAnnotations' : (
      arg_0: Principal,
      arg_1: string,
      arg_2: string,
    ) => Promise<undefined>,
}
export interface _SERVICE extends kawak {}
