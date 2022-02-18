import Types "types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

module {
  
  type Profile = Types.UserEntry;
  type UserId = Types.UserId;
  type EssayCanister = Types.EssayCanister;
  type UserName = Types.UserName;

  func makeProfile(userId: UserId, userName: UserName, essayCanister: EssayCanister, userEmail : Text): Profile {
    {
        id= userId;
        userName= userName;
        essayCanister= essayCanister;
        email = userEmail;
        createdAt= Time.now();
        token = 10;
        userRating = 5;
        pastRatedFeedbacks = [];
        updateCanister = false;
    }
  };

  func isEq(x: UserId, y: UserId): Bool { x == y };
  func isEqUserName(x: UserName, y: UserName): Bool { x == y };

    public class User() {
    
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);
    let hashMapUserName = HashMap.HashMap<UserName, UserId>(1, isEqUserName, Text.hash);

    public func createOne(userId: UserId, userName: UserName, essayCanister: EssayCanister) {
      hashMap.put(userId, makeProfile(userId, userName, essayCanister));
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

    public func updateDone(userId: UserId, profile: Profile) {
      hashMap.put(userId, profile);
    };

  };

};