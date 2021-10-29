export const idlFactory = ({ IDL }) => {
  const EssayEntry = IDL.Record({
    'title' : IDL.Text,
    'topic' : IDL.Text,
    'wordCount' : IDL.Nat32,
    'text' : IDL.Text,
    'tokenToPay' : IDL.Nat,
    'reviewTimes' : IDL.Nat32,
  });
  const UserEntry = IDL.Record({
    'userName' : IDL.Text,
    'token' : IDL.Nat,
    'myEssays' : IDL.Vec(IDL.Nat),
    'userRating' : IDL.Nat32,
    'reviewingEssay' : IDL.Nat,
  });
  return IDL.Service({
    'addReviewingEssay' : IDL.Func([IDL.Nat], [], ['oneway']),
    'createEssay' : IDL.Func([EssayEntry], [IDL.Bool], []),
    'createProfile' : IDL.Func([UserEntry], [IDL.Bool], []),
    'getAllEssays' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, EssayEntry))],
        [],
      ),
    'getEssay' : IDL.Func([IDL.Nat], [IDL.Opt(EssayEntry)], []),
    'getUserEntrybyPrincipal' : IDL.Func([], [IDL.Opt(UserEntry)], []),
    'logIn' : IDL.Func([], [IDL.Bool], []),
    'pay' : IDL.Func([UserEntry, IDL.Nat], [UserEntry], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
