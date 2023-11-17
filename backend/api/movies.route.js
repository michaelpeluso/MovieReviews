import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retrieve a list of movies.
 *     description: Retrieve a list of movies from sample_mflix MongoDB database.
 *     tags: [movies]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number to return for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           maximum: 9999
 *           format: int32
 *     responses:
 *       200:
 *         description: A list of movies.
 */

// request to view movies
router.route("/").get(MoviesController.apiGetMovies);

/**
 * @swagger
 * /api/v1/movies/review:
 *   post:
 *     summary: Create a movie review.
 *     description: Create a new review for a movie in the sample_mflix MongoDB database.
 *     tags: [reviews]
 *     parameters:
 *       - name: review_id
 *         in: query
 *         description: 24 character code unique to each review.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 24
 *           format: string
 *       - name: review
 *         in: query
 *         description: The updated review.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 9999
 *           format: string
 *       - name: user_id
 *         in: query
 *         description: 24 character code unique to each user.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 24
 *           format: string
 *       - name: name
 *         in: query
 *         description: The name of the reviewer.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 9999
 *           format: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *               review:
 *                 type: string
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Acknowledgement that POST was successful.
 *                   example: true
 *                 insertedId:
 *                   type: integer
 *                   description: The new review ID.
 *                   example: 6536e4847244a30f5b7fb0a1
 *   put:
 *     summary: Edit a movie review.
 *     description: Update a review for a movie in the sample_mflix MongoDB database.
 *     tags: [reviews]
 *     parameters:
 *       - name: review_id
 *         in: query
 *         description: 24 character code unique to each review.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 24
 *           format: string
 *       - name: review
 *         in: query
 *         description: The updated review.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 9999
 *           format: string
 *       - name: user_id
 *         in: query
 *         description: 24 character code unique to each user.
 *         required: true
 *         schema:
 *           type: string
 *           maximum: 24
 *           format: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_id:
 *                 type: string
 *               review:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Acknowledgement that POST was successful.
 *                   example: true
 *                 insertedId:
 *                   type: integer
 *                   description: The new review ID.
 *                   example: 6536e4847244a30f5b7fb0a1
 */

// add a route to handle /review HTTP requests
router.route("/review").post(ReviewsController.apiPostReview).put(ReviewsController.apiUpdateReview).delete(ReviewsController.apiDeleteReview);

// add a route to handle /id:/id HTTP requests
router.route("/id/:id").get(MoviesController.apiGetMovieById);

// get ratings
router.route("/ratings").get(MoviesController.apiGetRatings);

export default router;
