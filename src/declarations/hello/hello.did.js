export const idlFactory = ({ IDL }) => {
  const EssayEntry = IDL.Record({
    'title' : IDL.Text,
    'topic' : IDL.Text,
    'wordCount' : IDL.Nat32,
    'userId' : IDL.Principal,
    'text' : IDL.Text,
    'tokenToPay' : IDL.Nat32,
    'reviewTimes' : IDL.Nat32,
  });
  const UserEntry = IDL.Record({
    'userName' : IDL.Text,
    'token' : IDL.Nat32,
    'myEssays' : IDL.Vec(IDL.Nat),
    'userRating' : IDL.Nat32,
    'reviewingEssay' : IDL.Vec(IDL.Nat),
  });
  return IDL.Service({
    'addReviewingEssay' : IDL.Func([IDL.Nat], [], ['oneway']),
    'createEssay' : IDL.Func([EssayEntry], [], []),
    'createProfile' : IDL.Func([UserEntry], [IDL.Bool], []),
    'getAllEssays' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, EssayEntry))],
        [],
      ),
    'getEssay' : IDL.Func([IDL.Nat], [IDL.Opt(EssayEntry)], []),
    'getUserEntrybyPrincipal' : IDL.Func([], [IDL.Opt(UserEntry)], []),
    'logIn' : IDL.Func([], [IDL.Bool], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
