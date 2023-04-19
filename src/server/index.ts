import cors from 'cors';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

import { NewUser, User } from '../interfaces/user';
import {
  Post,
  today,
  thisWeek,
  thisMonth,
} from '../interfaces/posts';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const allUsers = Array<User>();
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

const SECRET = 'my-secret';
const COOKIE = 'vuejs-jwt';

const authenticate = (id: string, req: Request, res: Response) => {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'vuejs-typescript-composition-api',
    expiresIn: '30 days',
  });

  res.cookie(COOKIE, token, { httpOnly: true });
};

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE];

    const result = jsonwebtoken.verify(token, SECRET) as {
      id: string;
    };

    res.json({ id: result.id });
  } catch (error) {
    res.status(404).end();
  }
});

app.post('/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true });
  res.status(200).end();
});

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user = {
    ...req.body,
    id: (Math.random() * 100000).toFixed(),
  };
  allUsers.push(user);

  authenticate(user.id, req, res);

  const { password, ...rest } = user;

  return res.json(rest);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
