// import module `database` from `../models/db.js`
const db = require('../models/db.js');

const Review = require('../models/ReviewModel.js');

const votingController = {
    getUpvote: async function (req, res) {
        var review_id = req.query.review_id;

        var review = await db.findOne(Review, { review_id: review_id });
        // first case is when the user is not in upvotes and downvotes array
        /*
            add the user to the upvotes array
            increment total upvotes
        */

        var filter = { review_id: review_id };

        var numUpvotes = review.votes.numUpvotes;
        var numDownvotes = review.votes.numDownvotes;

        if (!review.votes.upvotes.includes(req.session.user) && !review.votes.downvotes.includes(req.session.user)) {

            numUpvotes = review.votes.numUpvotes + 1;

            var upvotes = review.votes.upvotes;

            // push the user to the upvotes array
            upvotes.push(req.session.user);

            var update = {
                votes: {
                    numUpvotes: numUpvotes,
                    upvotes: upvotes,
                    numDownvotes: review.votes.numDownvotes,
                    downvotes: review.votes.downvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }
        // case 2 is when the user is in upvotes array
        else if (review.votes.upvotes.includes(req.session.user)) {
            /*
                remove the user from the upvotes array
                decrement total upvotes
            */

            numUpvotes = review.votes.numUpvotes - 1;

            var upvotes = review.votes.upvotes;

            // pop the user from the upvotes array
            upvotes.pop(req.session.user);

            var update = {
                votes: {
                    numUpvotes: numUpvotes,
                    upvotes: upvotes,
                    numDownvotes: review.votes.numDownvotes,
                    downvotes: review.votes.downvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }
        // case 3 is when the user is in downvotes array
        else if (review.votes.downvotes.includes(req.session.user)) {
            /*
                remove the user from the downvotes array
                decrement total downvotes
                add the user to the upvotes array
                increment total upvotes
            */

            numDownvotes = review.votes.numDownvotes - 1;

            var downvotes = review.votes.downvotes;

            // pop the user in the downvotes array
            downvotes.pop(req.session.user);

            numUpvotes = review.votes.numUpvotes + 1;

            var upvotes = review.votes.upvotes;

            // push the user to the upvotes array
            upvotes.push(req.session.user);

            var update = {
                votes: {
                    numUpvotes: numUpvotes,
                    numDownvotes: numDownvotes,
                    upvotes: upvotes,
                    downvotes: downvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }

        var data = {
            numUpvotes: numUpvotes,
            numDownvotes: numDownvotes,
            success: true,
        };

        res.send(data);
    },

    getDownvote: async function (req, res) {
        var review_id = req.query.review_id;

        var review = await db.findOne(Review, { review_id: review_id });

        var filter = { review_id: review_id };

        var numUpvotes = review.votes.numUpvotes;
        var numDownvotes = review.votes.numDownvotes;

        // first case is when the user is not in upvotes and downvotes array
        if (!review.votes.upvotes.includes(req.session.user) && !review.votes.downvotes.includes(req.session.user)) {

            numDownvotes = review.votes.numDownvotes + 1;

            var downvotes = review.votes.downvotes;

            // push the user to the downvotes array
            downvotes.push(req.session.user);

            var update = {
                votes: {
                    numDownvotes: numDownvotes,
                    downvotes: downvotes,
                    numUpvotes: review.votes.numUpvotes,
                    upvotes: review.votes.upvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }
        // case 2 is when the user is in downvotes array
        else if (review.votes.downvotes.includes(req.session.user)) {

            numDownvotes = review.votes.numDownvotes - 1;

            var downvotes = review.votes.downvotes;

            // pop the user from the downvotes array
            downvotes.pop(req.session.user);

            var update = {
                votes: {
                    numDownvotes: numDownvotes,
                    downvotes: downvotes,
                    numUpvotes: review.votes.numUpvotes,
                    upvotes: review.votes.upvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }
        // case 3 is when the user is in the upvotes array
        else if (review.votes.upvotes.includes(req.session.user)) {

            numDownvotes = review.votes.numDownvotes + 1;

            var downvotes = review.votes.downvotes;

            // push the user to the downvotes array
            downvotes.push(req.session.user);

            numUpvotes = review.votes.numUpvotes - 1;

            var upvotes = review.votes.upvotes;

            // pop the user from the upvotes array

            upvotes.pop(req.session.user);

            var update = {
                votes: {
                    numUpvotes: numUpvotes,
                    numDownvotes: numDownvotes,
                    upvotes: upvotes,
                    downvotes: downvotes
                }
            };

            await db.updateOne(Review, filter, update);
        }

        var data = {
            numUpvotes: numUpvotes,
            numDownvotes: numDownvotes,
            success: true,
        };

        res.send(data);
    }
}


module.exports = votingController;