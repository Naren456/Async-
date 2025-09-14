import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import AuthRouter from './routes/auth.route.js';
import CourseraRouter from './routes/coursera.route.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // replace with your frontend URL
  credentials: true // allow cookies to be sent
}));
app.use(express.json());


// routes
app.use('/api/auth', AuthRouter);
app.use('/api/coursera',CourseraRouter);


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});