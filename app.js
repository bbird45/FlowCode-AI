const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const webhookRoutes = require('./routes/webhook');

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Use the webhook routes
app.use('/webhook', webhookRoutes);

if (!process.env.VERCEL) {
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}

module.exports = app; // สำคัญสำหรับ Vercel Dev

