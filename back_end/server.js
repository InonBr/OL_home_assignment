const express = require('express');
const app = express();
const cors = require('cors');
const users_routers = require('./routers/users_routers');

const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', users_routers);

app.get('/api', (req, res) => {
  res.send('home page');
});

app.listen(port, () => {
  console.log(`🔵 app listening at http://localhost:${port}`);
});
