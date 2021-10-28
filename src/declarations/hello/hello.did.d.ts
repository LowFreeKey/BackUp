import type { Principal } from '@dfinity/principal';
export interface EssayEntry {
  'title' : string,
  'topic' : string,
  'wordCount' : number,
  'userId' : Principal,
  'text' : string,
  'tokenToPay' : number,
  'reviewTimes' : number,
}
export interface UserEntry {
  'userName' : string,
  'token' : number,
  'myEssays' : Array<bigint>,
  'userRating' : number,
  'reviewingEssay' : Array<bigint>,
}
export interface _SERVICE {
  'addReviewingEssay' : (arg_0: bigint) => Promise<undefined>,
  'createEssay' : (arg_0: EssayEntry) => Promise<undefined>,
  'createProfile' : (arg_0: UserEntry) => Promise<boolean>,
  'getAllEssays' : () => Promise<Array<[bigint, EssayEntry]>>,
  'getEssay' : (arg_0: bigint) => Promise<[] | [EssayEntry]>,
  'getUserEntrybyPrincipal' : () => Promise<[] | [UserEntry]>,
  'logIn' : () => Promise<boolean>,
  'whoami' : () => Promise<Principal>,
}
