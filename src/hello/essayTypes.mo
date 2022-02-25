import Types "types";

module {
    
    public type UserId = Types.UserId; 
    public type UserName = Types.UserName;
    public type EssayId = Text;
    public type EssayTitle = Text; 
    public type EssayTopic = Text; 

    public type EssayEntry = {
            essayOwner : UserName;
            essayId : EssayId;
            title : EssayTitle;
            topic : EssayTopic;
            createdAt : Int;
            forgeVisits : Nat;
            tokenCost : Int;
            text : Text;
        };

    public type Annotation = {
        essayOwner : UserId;
        annotator : UserId;
        annotions : Text;
    };

}