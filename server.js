const express = require('express');
const path = require('path');
const app = express();

// Middleware to add the ngrok-skip-browser-warning header
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', '1');
  next();
});

app.get('/api/pools', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coingecko.com/api/v3/onchain/search/pools', {
      headers: { 'x-cg-pro-api-key': process.env.REACT_APP_COINGECKO_API_PRO_KEY },
      params: { query: 'weth', network: 'eth', include: 'dex', page: 1 }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
