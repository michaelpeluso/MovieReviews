import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;
export default class ReviewsDAO {
    static async injectDB(conn) {
        // if reviews not fulfilled, access the db reviews collection
        if (reviews) {
            return;
        }

        // if collection does not exist, MongoDB will create it
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection("reviews");
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`);
        }
    }

    // add review
    static async addReview(movieId, user, review, date) {
        try {
            // create a review
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                // convert movieID to MongoDB object
                movie_id: new ObjectId(movieId),
            };

            //
            // insert review
            return await reviews.insertOne(reviewDoc);
            //
            //
        } catch (e) {
            console.error(`unable to post review: ${e}`);
            console.error(e);
            return { error: e };
        }
    }

    // update review
    static async updateReview(reviewId, userId, review, date) {
        try {
            // filter using user_id
            const updateResponse = await reviews.updateOne({ user_id: userId, _id: new ObjectId(reviewId) }, { $set: { review: review, date: date } });
            return updateResponse;
        } catch (e) {
            console.error(`unable to update review: ${e}`);
            console.error(e);
            return { error: e };
        }
    }

    // delete review
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
