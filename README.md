Dfinity/Encode final project Hackathon.

For questions. laszlo.corti@protonamil.com or Discord LowFreeKey#1759

We have been expericing some serious issues with CSS / Angular. 
But feel free to clone and run it locally so you may test the backend properly with Candid!

---
For Candid testing,

just follow along the function order in candid put in the needed inputs and you can create an user , write and submit your essay with parameters ( Topic, Education, TOken Payment and so on).
Then You can pull essays from other users and review them, make text annotations, submit your review and get payments from other users in kawak token, those get splitet by your rating e.g 90%, which is affected by the quality of work you do.
Working functions for the frontend. 

https://xcpqn-yiaaa-aaaai-aa2rq-cai.ic0.app/

There you find some examples.
Have FUN :)

by Kawak Team
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
