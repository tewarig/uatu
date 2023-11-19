const express = require('express');
const path = require('path');
const fs = require('fs'); // Importing the File System module
const cors = require('cors');
const app = express();
const { logger , search } = require('./routes');

// for ingestion of the log files
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.post('/log', logger); 
app.get('/search', search); 


// Serve API requests from /api
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// Serve static files from the React app
app.use('/frontend', express.static(path.join(__dirname, 'frontend/dist')));

// Updated catch-all handler
app.get('*', (req, res, next) => {
  // Check if request is for a static file
  const staticFile = path.join(__dirname, 'frontend/dist', req.path);
  if (fs.existsSync(staticFile)) {
    return res.sendFile(staticFile);
  }

  // For non-static requests, serve index.html
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
