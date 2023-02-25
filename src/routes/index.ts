// <import packages
import express from 'express';
// import packages>

// <import routes
import postsRoute from './postsRoute';
// import routes>

const router = express.Router();

const routes = [
  {
    path : "/posts",
    route : postsRoute
  }
]

/**
 * @description create all routes
 */
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;