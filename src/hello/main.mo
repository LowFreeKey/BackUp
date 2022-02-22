import Array "mo:base/Array";
import Blob "mo:base/Blob";
//import Cycles "mo:base/ExperimentalCycles";
import Database "database";
import Debug "mo:base/Debug";
import EssayHandler "essayHandler";
import Types "types";
import EssayTypes "essayTypes";
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
  type EssayEntry = EssayTypes.EssayEntry;

  type CanisterSettings = Types.CanisterSettings;
  type UpdateSettingsParams = Types.UpdateSettingsParams;
  type ICActor = Types.ICActor;

  let IC: ICActor = actor("aaaaa-aa");

  var user: Database.User = Database.User();
  var forge: Database.Forge = Database.Forge();


  stable var user_entries : [(UserId, UserEntry)] = [];
  stable var user_name_entries : [(UserName, UserId)] = [];

  

  stable var userCount : Nat = 0;

  func isEq(x: UserId, y: UserId): Bool { x == y };
  func isEqUserName(x: UserName, y: UserName): Bool { x == y };

  public shared(msg) func createUser(userName: UserName, email: Text) : async ?EssayCanister {
    switch(user.findOne(msg.caller)){
      case null{
        //Cycles.add(600_000_000_000);
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

    public shared(msg) func submittAnnotations(essayOwner: Principal,annotations:Text, essayId:Text): async (){
        forge.createAnnotation(msg.caller,essayOwner,annotations,essayId);
    };

    public shared(msg) func forgeEssay(essayEntry:EssayEntry,costs:Nat):async ?Bool{
        do?{
            var token = user.getTokenNumber(msg.caller)!;
            if(token >= costs)
            {
                user.subtractCosts(msg.caller,costs)!;
                forge.storeForgeEssay(msg.caller,essayEntry);
                return ?true;
            }
            else{
                return ?false;
            }
        }

    }

};