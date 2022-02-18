module {
  
  public type EssayCanister = Principal;
  public type UserId = Principal;
  public type UserName = Text;

  public type CanisterSettings = {
      controllers : [Principal];
  };
  public type UpdateSettingsParams = {
      canister_id: Principal;
      settings: CanisterSettings;
  };
  public type ICActor = actor {
      update_settings: shared(params: UpdateSettingsParams) -> async ();
  };

  public type UserEntry  = {
    id: UserId;
    userName: UserName;
    email : Text;
    essayCanister: EssayCanister;
    createdAt: Int;
    token  : Nat;
    userRating  : Nat;
    pastRatedFeedbacks : [Nat];
    updateCanister: Bool;
  };

};