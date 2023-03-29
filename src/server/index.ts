import cors from 'cors';
import express from 'express';

import { thisWeek, today, thisMonth } from '../interfaces/posts';

const app = express();
app.use(cors());

app.get('/posts', (req, res) => {
  return res.json([thisMonth, today, thisWeek]);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
