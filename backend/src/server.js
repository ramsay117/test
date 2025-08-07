import dotenv from 'dotenv';
import express from 'express';
import process from 'process';

dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

