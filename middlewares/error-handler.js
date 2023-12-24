const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;


  console.log(err)
  res.status(status).json({message})
};

module.exports = errorHandler;
