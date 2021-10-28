import Time = "mo:base/Time";

module {

public type  userEntry = {
        userName : Text;
        token  : Nat32;
        userRating  : Nat32;
        myEssays : [Nat];
        reviewingEssay : [Nat];
    };

    // essay info when submit button gets hit, for calcutale and work with later in profiles and balances etc
public type essayEntry = {
        title : Text;
        topic : Text;
        //createdAt : Time;  
        wordCount : Nat32;
        reviewTimes : Nat32;
        tokenToPay : Nat32;
        text : Text;
        userId : Principal;
    };

}
