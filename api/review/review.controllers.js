const Review = require("../../models/Review");
const Laundry = require("../../models/Laundry");
const User = require("../../models/User");

exports.fetchReview = async (reviewId, next) => {
    try {
      const review1 = await Review.findById(reviewId);
      return review1;
    } catch (error) {
      return next(error);
    }
  };

  exports.getReview = async (req, res, next) => {
    try {
      if (!req.user)
        return next({ status: 401, message: "You can't see reviews without signing up" });
  
      const { page = 1, limit = 10 } = req.query;
      // execute query with page and limit values
      const reviews = await Review.find()
        .select("-__v")
        .populate("user", "username-_id")
        .populate("laundry", "name-_id");
      //.populate("movie user")
      // .limit(limit * 1)
      // .skip((page - 1) * limit)
      // .exec();
  
      const count = await Review.countDocuments();
  
      return res.status(200).json({
        reviews,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      return next(error);
    }
  };
  
  exports.addReview = async (req, res, next) => {
    try {
      const { laundryId } = req.params;
      const foundLaundry = await Laundry.findById({ _id: laundryId }).populate(
        "reviews"
      );
      if (!foundLaundry) return next({ status: 404, message: "laundry not found" });
  
      let reviewed = false;
      if (foundLaundry.reviews.length > 0) {
        foundLaundry.reviews.forEach((review) => {
          if (review.user?._id.equals(req.user._id)) {
            reviewed = true;
          }
        });
      }
  
      if (reviewed)
        return next({
          status: 401,
          message: `you have already reviewed ${foundLaundry.name}`,
        });
  
      req.body.user = req.user._id;
      req.body.laundry = foundLaundry._id;
      const newReview = await Review.create(req.body);
  
      // to count the average rating
      let counter = 0;
      let total = 0;
      foundLaundry.reviews.push(newReview);
      foundLaundry.reviews.forEach((review) => {
        if (review.ratings >= 0) {
          console.log(review.ratings);
          total += review.ratings;
          counter++;
        }
      });
  
      const avgRating = (total / counter).toFixed(1);
  
      await req.user.updateOne({
        $push: { reviews: newReview._id },
      });
  
      await foundLaundry.updateOne({
        $push: { reviews: newReview._id },
      });
  
      if (foundLaundry.reviews.length >= 1) {
        await foundLaundry.updateOne({
          $set: { avgRating },
        });
      } else if (foundLaundry.reviews.length == 0) {
        await foundLaundry.updateOne({
          $set: { avgRating: newReview.ratings },
        });
      }
  
      res.status(201).json(newReview);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
