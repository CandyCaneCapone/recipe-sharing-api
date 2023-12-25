const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal server error";
  let status = err.statusCode || 500;

  if (err.name === "CastError") {
    status = 404;
    message = `no recipe found with id ${err.value}`;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
