import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import {
  thisWeek,
  today,
  thisMonth,
  Post,
} from '../interfaces/posts';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [thisMonth, today, thisWeek];

app.get('/posts', (req, res) => {
  return res.json(allPosts);
});

app.post<{}, {}, Post>('/posts', (req, res) => {
  const newPost = {
    ...req.body,
    id: (Math.random() * 100000).toFixed(),
  };
  allPosts.push(newPost);

  return res.json(newPost);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
