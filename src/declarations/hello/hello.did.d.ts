import type { Principal } from '@dfinity/principal';
export interface EssayEntry {
  'title' : string,
  'topic' : string,
  'wordCount' : number,
  'text' : string,
  'tokenToPay' : bigint,
  'reviewTimes' : number,
}
export interface UserEntry {
  'userName' : string,
  'token' : bigint,
  'myEssays' : Array<bigint>,
  'pastRatedFeedbacks' : Array<bigint>,
  'userRating' : bigint,
  'reviewingEssay' : bigint,
}
export interface _SERVICE {
  'addRating' : (arg_0: bigint, arg_1: bigint) => Promise<undefined>,
  'addReviewingEssay' : (arg_0: bigint) => Promise<boolean>,
  'createEssay' : (arg_0: EssayEntry) => Promise<boolean>,
  'createProfile' : (arg_0: UserEntry) => Promise<boolean>,
  'getAllEssays' : () => Promise<Array<[bigint, EssayEntry]>>,
  'getEssay' : (arg_0: bigint) => Promise<[] | [EssayEntry]>,
  'getReviewingEssay' : () => Promise<[] | [EssayEntry]>,
  'getReviewsFromEssay' : (arg_0: bigint) => Promise<string>,
  'getUserEntrybyPrincipal' : () => Promise<[] | [UserEntry]>,
  'incomeByAvarage' : (arg_0: bigint) => Promise<bigint>,
  'logIn' : () => Promise<boolean>,
  'pay' : (arg_0: UserEntry, arg_1: bigint) => Promise<UserEntry>,
  'submittReviewedEssay' : (arg_0: string) => Promise<undefined>,
  'whoami' : () => Promise<Principal>,
}
