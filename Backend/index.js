import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import AuthRouter from './routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRouter);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});