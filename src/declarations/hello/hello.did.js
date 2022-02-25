export const idlFactory = ({ IDL }) => {
  const UserName__1 = IDL.Text;
  const EssayCanister = IDL.Principal;
  const EssayTitle = IDL.Text;
  const EssayTopic = IDL.Text;
  const UserName = IDL.Text;
  const EssayId = IDL.Text;
  const EssayEntry = IDL.Record({
    'title' : EssayTitle,
    'topic' : EssayTopic,
    'forgeVisits' : IDL.Nat,
    'essayOwner' : UserName,
    'createdAt' : IDL.Int,
    'text' : IDL.Text,
    'tokenCost' : IDL.Int,
    'essayId' : EssayId,
  });
  const kawak = IDL.Service({
    'createUser' : IDL.Func(
        [UserName__1, IDL.Text],
        [IDL.Opt(EssayCanister)],
        [],
      ),
    'forgeEssay' : IDL.Func([EssayEntry, IDL.Nat], [IDL.Opt(IDL.Bool)], []),
    'submittAnnotations' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text],
        [],
        [],
      ),
  });
  return kawak;
};
export const init = ({ IDL }) => { return []; };
