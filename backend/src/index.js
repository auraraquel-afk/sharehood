require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ShareHood API'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API ShareHood en puerto " + PORT);
});