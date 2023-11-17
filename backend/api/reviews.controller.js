import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    //Method for POST request
    static async apiPostReview(req, res, next) {
        try {
            //retrieve data
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            };
            const date = new Date();

            //send info to addReview method
            const ReviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date);

            //return success/failure
            res.json(ReviewResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method for Update request
    static async apiUpdateReview(req, res, next) {
        // request
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();

            // extract reviewID and review
            const ReviewResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, review, date);

            var { error } = ReviewResponse;
            if (error) {
                res.status.json({ error });
            }
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("unable to update review. User may not be original poster");
            }
            res.json(ReviewResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method for Delete request
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;

            // delete
            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
            res.json(ReviewResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                user_id: userId,
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete review: ${e}`);
            console.error(e);
            return { error: e.message };
        }
    }
}
