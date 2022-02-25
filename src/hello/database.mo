import Types "types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import EssayTypes "essayTypes";

module {
  
  type Profile = Types.UserEntry;
  type UserId = Types.UserId;
  type EssayCanister = Types.EssayCanister;
  type UserName = Types.UserName;
  type EssayEntry = EssayTypes.EssayEntry;
  type Annotation = EssayTypes.Annotation;
  type EssayId = EssayTypes.EssayId;

  func makeProfile(userId: UserId, userName: UserName, essayCanister: EssayCanister, userEmail : Text, createdAt:Int,giventoken:Int, givenuserRating:Nat,givenpastRatedFeedbacks:[Nat],updateCanister:Bool): Profile{
    {
        id= userId;
        userName= userName;
        essayCanister= essayCanister;
        email = userEmail;
        createdAt= createdAt;
        token = giventoken;
        userRating = givenuserRating;
        pastRatedFeedbacks = givenpastRatedFeedbacks;
        updateCanister = updateCanister;
    }
  };

  func makeAnnotation(owner:Principal,givenAnnotator:Principal,text:Text): Annotation{
    {
        essayOwner = owner;
        annotator = givenAnnotator;
        annotions = text;
    }
  };

  func isEq(x: UserId, y: UserId): Bool { x == y };
  func isEqUserName(x: UserName, y: UserName): Bool { x == y };

    public class User() {
    
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);
    let hashMapUserName = HashMap.HashMap<UserName, UserId>(1, isEqUserName, Text.hash);

    public func createOne(userId: UserId, userName: UserName, essayCanister: EssayCanister,email:Text) {
      hashMap.put(userId, makeProfile(userId, userName, essayCanister,email,Time.now(),5,5,[],false));
      hashMapUserName.put(userName, userId);
    };

//    public func updateOne(userId: UserId, profile: Profile) {
//      hashMap.put(userId, profile);
//    };

    public func findOne(userId: UserId): ?Profile {
      hashMap.get(userId);
    };

    public func getUserId(userName: UserName): ?UserId {
      hashMapUserName.get(userName);
    };

    // Functions used for creating backup of state
    public func getAllUsers(): [(UserId, Profile)] {
      Iter.toArray(hashMap.entries())
    };
    public func getAllUsersNames(): [(UserName, UserId)] {
      Iter.toArray(hashMapUserName.entries())
    };

    public func insertUsers(userId: UserId, profile: Profile) {
      hashMap.put(userId, profile);
    };
    public func insertUsersNames(userName: UserName, userId: UserId) {
      hashMapUserName.put(userName, userId);
    };

    public func subtractCosts(userId : UserId ,amount:Int):?()
    {
      do?{
        let profile = findOne(userId)!;
        var updatedToken = profile.token - amount;
        hashMap.put(userId, makeProfile(profile.id,profile.userName,profile.essayCanister,profile.email,profile.createdAt,updatedToken,profile.userRating,profile.pastRatedFeedbacks,profile.updateCanister));
      }
    };

    public func getTokenNumber(id:Principal):?Int{
        
        do?{
        let profile = hashMap.get(id)!;
        profile.token;
        };
        
    };

    public func updateDone(userId: UserId, profile: Profile) {
      hashMap.put(userId, profile);
    };
    
  };

  public class Forge(){
    let forgedEssays = HashMap.HashMap<UserId,EssayEntry>(0,isEq, Principal.hash);
    let annotations = HashMap.HashMap<EssayId,Annotation>(0,Text.equal, Text.hash);

    public func createAnnotation(annotator:Principal,essayOwner:Principal,text:Text,essayId:Text){
      	annotations.put(essayId,makeAnnotation(annotator,essayOwner,text));
    };

    public func storeForgeEssay(userID:UserId,essayEntry:EssayEntry){
        forgedEssays.put(userID,essayEntry);
    };

    public func deleteAnnotation(essayId:EssayId) {
        annotations.delete(essayId);
    };
//Issue will arise when user has multiples essays in forge because of the Key.
    public func deleteForgeEssay(userID:UserId) {
        forgedEssays.delete(userID); 
    };
  };
  

};