import FileTypes "essayTypes";
import Time "mo:base/Time";
import Text "mo:base/Text";
//import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import EssayTypes "essayTypes";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Nat "mo:base/Nat";
import Types "types";
import HashMap "mo:base/HashMap";


shared (msg) actor class EssayHandler (){

    type UserId = EssayTypes.UserId;
    type EssayTitle = EssayTypes.EssayTitle;
    type EssayTopic = EssayTypes.EssayTopic;
    type EssayId = EssayTypes.EssayId;
    type EssayEntry = EssayTypes.EssayEntry;
    type UserName = Types.UserName;

    stable var owner:Principal = msg.caller;

    stable var ownEssays : [(EssayId,EssayEntry)] = [];

    var ownerEssays = HashMap.HashMap<EssayId,EssayEntry>(0,Text.equal,Text.hash);
    var forgedEssays : [EssayEntry] = [];

    public query(msg) func getCanisterID() : async Principal{
        msg.caller;
    };

    public shared(msg) func createOwner(newOwner: Principal) : async Principal {
    assert(msg.caller==owner);
    owner := newOwner;
    await getCanisterID();
  };

  public shared(msg) func createEssay(user : UserName, title : EssayTitle, text : Text) : async Bool{
        assert(msg.caller==owner);
        return createOne(user,title,text);
    };

    func createOne(user : UserName, title : EssayTitle, text : Text):Bool{
        let id : EssayId = title # "-" # (Int.toText(Time.now()) # "-" # user);
        switch(ownerEssays.get(id))
            {
                case (?_){
                    return false;  
                };
                case null{
                    ownerEssays.put(id,makeEssay(user,title,"",Time.now(),0,text,id,0));
                    return true; 
                }
            };
    };

      func makeEssay(user : UserName, givenTitle : EssayTitle,topic:EssayTopic,createdAt:Int, forgeVisits:Nat, givenText : Text, givenEssayId : Text,essayCost:Int): EssayEntry {
        {
            essayOwner = user;
            essayId = givenEssayId;
            title = givenTitle;
            topic = topic;
            createdAt = createdAt;
            forgeVisits = forgeVisits;
            tokenCost = essayCost;
            text = givenText;
        }
    };

    public shared(msg) func getAllEssays() : async [(EssayId,EssayEntry)] {
        assert(msg.caller==owner);
        Iter.toArray(ownerEssays.entries());
    };

    public shared(msg) func deleteEssay(id : EssayId) : async () { 
        assert(msg.caller==owner);
        ownerEssays.delete(id);
    };

    public shared(msg) func getEssay(id: EssayId): async ?EssayEntry{
        assert(msg.caller==owner);
        return ownerEssays.get(id);
    };

    

    public shared(msg) func moldEssay(id:EssayId,title:EssayTitle,topic: EssayTopic,forgeVisits : Nat,essayLength : Nat,cost :Int): async ?(){
        
        do?{
        let forgingEssay = ownerEssays.get(id)!;
        ownerEssays.put(id,makeEssay(forgingEssay.essayOwner,title,topic,forgingEssay.createdAt,forgeVisits,forgingEssay.text,forgingEssay.essayId,cost));
        }
        //now it should go into the forgeHandler map
    };

    
};