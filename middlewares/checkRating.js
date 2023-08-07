module.exports = (req, res, next) => {
  if (req.body.rating < 1 || req.body.rating > 5)
    return next({
      status: 404,
      message: "The Rating Should be between 1 - 5",
    });
  next();
};
