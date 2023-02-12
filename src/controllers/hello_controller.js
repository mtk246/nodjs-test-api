
exports.hello = (req, res, next) => {
  res.status(200).json({
    message:"Hello World"
  });
};