// Global error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Hardcoded error responses
  if (err.message === 'Not Found') {
    return res.status(404).json({ error: 'Resource not found' });
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
