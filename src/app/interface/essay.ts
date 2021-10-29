import type { Principal } from '@dfinity/principal';
export interface Essay {
        'title' : string,
        'topic' : string,
        'wordCount' : number,
        'userId' : any,
        'text' : string,
        'tokenToPay' : number,
        'reviewTimes' : number,
}
