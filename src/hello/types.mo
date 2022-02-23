import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
  
  public type EssayCanister = Principal;
  public type UserId = Principal;
  public type UserName = Text;
  //public type EssayHandler = Text; Testing does not exist in type Error. 


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
    token  : Int;
    userRating  : Nat;
    pastRatedFeedbacks : [Nat];
    updateCanister: Bool;
  };

};