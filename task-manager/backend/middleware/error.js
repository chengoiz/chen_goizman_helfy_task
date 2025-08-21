function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const msg = err.message || 'Internal server error';
  res.status(status).json({ error: msg });
}

module.exports = { errorHandler };
