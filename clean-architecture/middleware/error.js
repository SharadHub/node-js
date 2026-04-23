const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.stack);

  // handling cast error
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    res.status(404).json({
      success: false,
      error: message,
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    status: false,
    error: err.message || "Server error",
  });
};

module.exports = errorHandler;
