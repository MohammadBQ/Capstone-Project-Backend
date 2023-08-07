const express = require("express");

const { getReview, fetchReview, addReview } = require("./review.controllers");

const router = express.Router();
const passport = require("passport");
const validateRating = require("../../middlewares/checkRating");
const signedIn = passport.authenticate("jwt", { session: false });


router.param("reviewId", async (req, res, next, reviewId) => {
  try {
    const foundReview = await fetchReview(reviewId);
    if (!foundReview) return next({ status: 404, message: "Review not found" });
    req.review = foundReview;
    next();
  } catch (error) {
    return next(error);
  }
});

router.use(validateRating);
router.get("/", signedIn, getReview);
router.post("/:laundryId", signedIn, addReview);

module.exports = router;

