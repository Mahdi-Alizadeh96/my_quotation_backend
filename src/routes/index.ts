// <import packages
import express from 'express';
// import packages>

// <import routes
import postsRoute from './posts.route';
import authRoute from './auth.route';
import userRoute from './user.route';
// import routes>

const router = express.Router();

const routes = [
  {
    path : "/posts",
    route : postsRoute
  },
  {
    path : "/auth",
    route : authRoute
  },
  {
    path : "/user",
    route : userRoute
  }
]

/**
 * @description create all routes
 */
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;