const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('../routes');

// Load routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
