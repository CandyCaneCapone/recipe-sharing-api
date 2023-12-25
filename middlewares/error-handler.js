const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal server error";
  let status = err.statusCode || 500;

  console.log(err)

  if (err.name === "CastError") {
    status = 404;
    message = `no recipe found with id ${err.value}`;
  }

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
