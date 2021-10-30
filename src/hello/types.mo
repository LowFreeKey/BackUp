import Time = "mo:base/Time";

module {

public type  userEntry = {
        userName : Text;
        token  : Nat;
        userRating  : Nat;
        myEssays : [Nat];
        reviewingEssay : Nat;
        pastRatedFeedbacks : [Nat];
    };

    // essay info when submit button gets hit, for calcutale and work with later in profiles and balances etc
public type essayEntry = {
        title : Text;
        topic : Text;
        //createdAt : Time;  
        wordCount : Nat32;
        reviewTimes : Nat32;
        tokenToPay : Nat;
        text : Text;
    };

public type annonciation = {
    user : Principal;
    comments : Text;
}
}