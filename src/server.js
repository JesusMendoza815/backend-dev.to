import express from  'express';
import routerUsers from './routers/user.router.js';
import routerPosts from './routers/post.router.js'
import routerComments from './routers/comment.router.js'
import cors from 'cors'

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routers
server.use('/users', routerUsers);
server.use('/posts', routerPosts);
server.use('/comments', routerComments);


export { server }