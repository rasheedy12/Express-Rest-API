const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};


module.exports = { errorHandler, notFoundHandler };
