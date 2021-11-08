Dfinity/Encode final project Hackathon.

For questions. laszlo.corti@protonamil.com or Discord LowFreeKey#1759

We have been expericing some issues with Frontend implementation via Angular.
But feel free to clone and run it locally so you may test the backend properly with Candid!

Technical Data Flow: https://www.figma.com/file/Bl0leGtRxRPWMA61T2PeJJ/Technical-Data-Flow

---
For Candid testing,

Follow the function order in Candid, put the required inputs so you can create a user "WordSmith". Write and submit your essay with the fitting parameters ( Topic, Education, Word Count, Token Bounty).
Then You can pull essays from other users and review them, make text annotations, submit your review and get payments from other users in the KawaK token. The distribution of toekens is split, where the majority will go will go to the WordSmith and the remainder the indepedant Tribunal pool. 


Live Demo:
https://xcpqn-yiaaa-aaaai-aa2rq-cai.ic0.app/

There you find some examples.
Have FUN :)

by the KawaK Team
_________________


We have 3 HashMaps, dbase_profiles, dbase_essays, dbase_annotations


1. createProfile(), awaits a input username which have to be uniqe in data base
2. createEssay(), awaits parameter from Type UserEntry, title, text essay, diff params, > returns bool if submitted
3. getAllEssays(), shows all created essay from users , in marketplace side frontend
4. getUserEntryByPrincipal, shows only your essays, if nothing there > NULL

5. getReviewEssay, shows essay in review page
5. addReviewingEssay, gives ID from essay puts it in your user profile for reviewing, only if its not your own essay ID, adds origin essay id from essay thats get reviewd, only 1 review essay per reviewer.
5. SubmitReviewedEssay, puts Annotation as Text in database


6. getREviewsFromEssay, origing writer gets essay with annotations from database
6. addRating(), gets Essay ID, put rating NAT 1-10, computes average rating by adding nat to array
7. IncomeByAverage(), calculates Payment of the Reviewer by his average Rating, 
