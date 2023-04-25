import express from  'express';
import routerUsers from './routers/user.router.js';
import routerPosts from './routers/post.router.js'
import cors from 'cors'

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routers
server.use('/users', routerUsers);
server.use('/posts', routerPosts)


export { server }