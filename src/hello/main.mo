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

//import Erc20 "erc20";

actor main {

    // from types.mo
    public type UserEntry = Types.userEntry;
    public type EssayEntry = Types.essayEntry;
    public type Annonciation = Types.annonciation;
    //public type Token = Erc20.erc20_token;

    var dbase_profiles = Map.HashMap<Principal,UserEntry>(0,Principal.equal,Principal.hash);
    var dbase_essays = Map.HashMap<Nat,EssayEntry>(0,Nat.equal,Hash.hash);
    var dbase_annonciations = Map.HashMap<Nat,Annonciation>(0,Nat.equal,Hash.hash);

    private stable var currentNextId : Nat = 1;
    
    private stable var upgradeCanistersAnnonciation : [(Nat, Annonciation)] = [];
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

    public shared(msg) func createProfile( userData:UserEntry ) : async Bool {
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
        
        //var testToken : Erc20.erc20_token = await Erc20.erc20_token("","",2,1,msg.caller);

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
            pastRatedFeedbacks = user.pastRatedFeedbacks;
        }
    };

    public shared(msg) func addReviewingEssay(id:Nat) : async Bool {
        
        var user  = dbase_profiles.get(msg.caller);
        var isIn = true;

        switch (user) {
            case (null) {
                isIn := false;
            };
            case (?user) {

                for(x in user.myEssays.vals())
                 {
                    if(x == id)
                    {
                        isIn := false;
                    }
                 };

                 if(isIn == true){
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
        return isIn;
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
            pastRatedFeedbacks = user.pastRatedFeedbacks;
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
            pastRatedFeedbacks = user.pastRatedFeedbacks;
            }
        }
  };

    public shared(msg) func incomeByAvarage(amount: Nat) : async Nat
    {
        var user  = dbase_profiles.get(msg.caller);
        var income = 0;
        switch (user) {
            case (null) {
            };
            case (?user) {
                income := (amount / 10) * user.userRating;
            };
        };
        return income;
    };

    public func addRating(essayId : Nat, latestRating : Nat):()
    {
        var feedbackCreator = dbase_annonciations.get(essayId);

        switch (feedbackCreator) {
            case (null) {
            };
            case (?feedbackCreator) {
                    var user  = dbase_profiles.get(feedbackCreator.user);
                    switch (user) {
                        case (null) {
                        };
                        case (?user) {
                                var updatedArray = Array.append(user.pastRatedFeedbacks,[latestRating]);
                                var summe = 0;
                                var iterator = 0;
                                for(x in updatedArray.vals())
                                {
                                    iterator := iterator + 1;
                                    summe := summe + x;
                                };
                                var replace = {
                                    userName = user.userName;
                                    token  = user.token;
                                    userRating  = Nat.div(summe,iterator);
                                    myEssays = user.myEssays;
                                    reviewingEssay = user.reviewingEssay;
                                    pastRatedFeedbacks = updatedArray;
                                };

                                var replaced = dbase_profiles.replace(feedbackCreator.user,replace);

                        };
                    };
                };
        };

        
    };

    public shared(msg) func getReviewingEssay() : async ?EssayEntry{
        
        var user  = dbase_profiles.get(msg.caller);
        switch (user) {
            case (null) {
                return null;
            };
            case (?user) {
                return dbase_essays.get(user.reviewingEssay);
                
            };
        };
    };

    public shared(msg) func submittReviewedEssay(newAnnonciation: Text) : (){
        
        
        
        var user  = dbase_profiles.get(msg.caller);
        switch (user) {
            case (null) {
            };
            case (?user) {
                dbase_annonciations.put(user.reviewingEssay,{
                    user = msg.caller;
                    comments = newAnnonciation});
            };
        };
    };

    public func getReviewsFromEssay(id : Nat) : async Text{
        
        var result = dbase_annonciations.get(id);

        switch (result) {
            case (null) {
                return "";
            };
            case (?result) {
                return result.comments;
            };
        };

        
    };

    public func getEssay(id:Nat) : async ?EssayEntry {
        dbase_essays.get(id)
    };

    public func getAllEssays() : async   ([(Nat, EssayEntry)]) {
        let entries = dbase_essays.entries();
        return Iter.toArray<(Nat, EssayEntry)>(entries);
    };

    system func preupgrade() {
        upgradeCanistersAnnonciation := Iter.toArray(dbase_annonciations.entries());
        upgradeCanistersProfiles := Iter.toArray(dbase_profiles.entries());
        upgradeCanistersEssays := Iter.toArray(dbase_essays.entries());
    };

    system func postupgrade() {
        dbase_annonciations := Map.fromIter<Nat, Annonciation>(upgradeCanistersAnnonciation.vals(), 10, Nat.equal, Hash.hash);
        upgradeCanistersAnnonciation := [];

        dbase_profiles := Map.fromIter<Principal, UserEntry>(upgradeCanistersProfiles.vals(), 10, Principal.equal, Principal.hash);
        upgradeCanistersProfiles := [];

        dbase_essays := Map.fromIter<Nat, EssayEntry>(upgradeCanistersEssays.vals(), 10, Nat.equal, Hash.hash);
        upgradeCanistersEssays := [];
    };
    
    public shared(msg) func getEssaysFromUser() : async [EssayEntry]{

        var user  = dbase_profiles.get(msg.caller);
        var essays : [EssayEntry] = [];
        switch (user) {
            case (null) {
                return [];
            };
            case (?user) {
                for(x in user.myEssays.vals())
                 {
                    var resultArray = Array.append(essays,[dbase_essays.get(x)]);
                 };
                 return essays;
            };
        };
    };
    public shared(msg) func deleteEssay( essayId:Nat) : () {

        var user = dbase_profiles.get(msg.caller);
        var updatedArray : [Nat] = [];

        switch (user) {
            case (null) 
            {

            };
            case (?user) 
            {
                for(v in user.myEssays.vals())
                {
                    if(v == essayId){
                    }
                    else
                    {
                        updatedArray := Array.append(updatedArray,[v]);
                    };
                };
                var updatedUser = {
                    userName = user.userName;
                    token  = user.token;
                    userRating  = user.userRating;
                    myEssays = updatedArray;
                    reviewingEssay= user.reviewingEssay;
                    pastRatedFeedbacks = user.pastRatedFeedbacks;
                };
                var replaced = dbase_profiles.replace(msg.caller,updatedUser);
                dbase_essays.delete(essayId);

            };
        };
    };
    
    public func deleteAllEssays():(){
        var emptyArray : [Nat] = [];
            for((v,x) in dbase_profiles.entries())
            {
                var currentUserInLoop = dbase_profiles.get(v);
                switch (currentUserInLoop) {
                    case (null) {

                    };
                    case (?currentUserInLoop) {
                        var updatedUser = {
                        userName = currentUserInLoop.userName;
                        token  = currentUserInLoop.token;
                        userRating  = currentUserInLoop.userRating;
                        myEssays = emptyArray;
                        reviewingEssay= currentUserInLoop.reviewingEssay;
                        pastRatedFeedbacks = currentUserInLoop.pastRatedFeedbacks;
                    };

                        var replaced = dbase_profiles.replace(v,updatedUser);
                    };
                };

            };
            for((v,x) in dbase_essays.entries())
            {
                 dbase_essays.delete(v);
            };

    };
    
    
}
}
