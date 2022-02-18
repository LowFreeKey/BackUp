import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Database "database";
import Debug "mo:base/Debug";
import EssayHandler "essayHandler";
import Types "types";
import TrieMap "mo:base/TrieMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

shared(msg) actor class kawak(){

let admin = msg.caller;

  type UserEntry = Types.UserEntry;
  type UserId = Types.UserId;
  type UserName = Types.UserName;
  type EssayCanister = Types.EssayCanister;

  type CanisterSettings = Types.CanisterSettings;
  type UpdateSettingsParams = Types.UpdateSettingsParams;
  type ICActor = Types.ICActor;

  let IC: ICActor = actor("aaaaa-aa");
  var user: Database.User = Database.User();

  stable var user_entries : [(UserId, UserEntry)] = [];
  stable var user_name_entries : [(UserName, UserId)] = [];

  stable var userCount : Nat = 0;

  public shared(msg) func createUser(userName: UserName, email: Text) : async ?EssayCanister {
    switch(user.findOne(msg.caller)){
      case null{
        Cycles.add(600_000_000_000);
        let essayHandleObj = await EssayHandler.EssayHandler();
        
        let canId = await essayHandleObj.createOwner(msg.caller);
        user.createOne(msg.caller, userName, canId, email);
        
        let settings: CanisterSettings = {
        controllers = [admin, msg.caller];
        };
        let params: UpdateSettingsParams = {
            canister_id = canId;
            settings = settings;
        };
        await IC.update_settings(params);
        
        userCount := userCount + 1;
        
        return(?canId);
      };
      case (?_){
        return(null);
      };
    }
  };
};