//pushed
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Trie "mo:base/Trie";
import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Types "types";

import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor main {

    // from types.mo
    public type UserEntry = Types.userEntry;
    public type EssayEntry = Types.essayEntry;

    
    var dbase_profiles = Map.HashMap<Principal,UserEntry>(0,Principal.equal,Principal.hash);

    var dbase_essays = Map.HashMap<Nat,EssayEntry>(0,Nat.equal,Hash.hash);

    private stable var currentNextId : Nat = 1;
    

    private stable var upgradeCanistersProfiles : [(Principal, UserEntry)] = [];
    private stable var upgradeCanistersEssays : [(Nat, EssayEntry)] = [];

    public shared (msg) func whoami() : async Principal {

        let p : Principal = msg.caller;
        return p;
    };



   public shared (msg) func logIn() : async Bool {

        let p : Principal = msg.caller;
        
        var result = dbase_profiles.get(p);
        
        switch(result){
          case null {
                return false;
            };
            case (?(_)){
                return true;
            };
        }; 
    };

    public shared(msg) func getUserEntrybyPrincipal() : async ?UserEntry{
        dbase_profiles.get(msg.caller);
    };

    public shared(msg) func createProfile( userData:UserEntry) : async Bool {
        var nameNotUsed = true;
        for((x,v) in dbase_profiles.entries())
        {
            if(v.userName == userData.userName)
            {
                nameNotUsed := false;
            }
        };

        if(nameNotUsed == true)
        {
            dbase_profiles.put(msg.caller,userData);
        };

        return nameNotUsed;

    };



    public shared(msg) func createEssay( essayData:EssayEntry) : async Bool {
        
        var paid = false;
        var user  = dbase_profiles.get(msg.caller);

        switch (user) {
            case (null) {
                
            };
            case (?user) {
                if( essayData.tokenToPay < user.token )
                {
                    dbase_essays.put(currentNextId,essayData); 
                    currentNextId += 1;
                    var updatedUser = setEssayId(user,true,currentNextId,essayData.tokenToPay);
                    var replaced = dbase_profiles.replace(msg.caller,updatedUser);
                    paid := true;
                }
                else{

                }
            };
        };

        
        return paid;
       
    };


    public func pay(user : UserEntry , valueToPay:Nat) : async UserEntry{
        {
            userName = user.userName;
            token  = user.token - valueToPay;
            userRating  = user.userRating;
            myEssays = user.myEssays;
            reviewingEssay= user.reviewingEssay;
        }
    };

    


    public shared(msg) func addReviewingEssay(id:Nat) : () {
        
        var user  = dbase_profiles.get(msg.caller);
        var isIn = false;

        switch (user) {
            case (null) {
            };
            case (?user) {

                for(x in user.myEssays.vals())
                 {
                    if(x == id)
                    {
                        isIn := true;
                    }
                 };

                 if(isIn == false){
                    if(user.reviewingEssay == 0) {
                        var updatedUser = setEssayId(user, false, id,0);
                        var replaced = dbase_profiles.replace(msg.caller,updatedUser);
                    }
                    else {
                        //Else he is already reviewing an essay
                    }
                 
                }
            };
        };

        currentNextId += 1;
    };


    func setEssayId(user: UserEntry, own : Bool, id:Nat, amount : Nat) : UserEntry {
        
        if(own)
        {
            {
            userName = user.userName;
            token  = user.token - amount;
            userRating  = user.userRating;
            myEssays = Array.append(user.myEssays,[id]);
            reviewingEssay= user.reviewingEssay;
            }
        }
        else
        {
            {
            userName = user.userName;
            token  = user.token;
            userRating  = user.userRating;
            myEssays = user.myEssays;
            reviewingEssay= id;
            }
        }
  };

   

    public func getEssay(id:Nat) : async ?EssayEntry {
        dbase_essays.get(id)
    };

    public func getAllEssays() : async   ([(Nat, EssayEntry)]) {
        let entries = dbase_essays.entries();
        return Iter.toArray<(Nat, EssayEntry)>(entries);
    };


    system func preupgrade() {
        upgradeCanistersProfiles := Iter.toArray(dbase_profiles.entries());
        upgradeCanistersEssays := Iter.toArray(dbase_essays.entries());
    };

    system func postupgrade() {
        dbase_profiles := Map.fromIter<Principal, UserEntry>(upgradeCanistersProfiles.vals(), 10, Principal.equal, Principal.hash);
        upgradeCanistersProfiles := [];

        dbase_essays := Map.fromIter<Nat, EssayEntry>(upgradeCanistersEssays.vals(), 10, Nat.equal, Hash.hash);
        upgradeCanistersEssays := [];
    };
}