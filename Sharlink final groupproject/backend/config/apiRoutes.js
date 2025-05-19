const express = require('express');
const userController = require('../controller/userController');
const collectionController = require('../controller/collectionController');
const linkController = require('../controller/linkController');
const { getUserCollections } = require('../controller/collectionController');

const userAuth = require('../auth/auth');
const { isLinkOwner } = require('../middlewares/ownership');
const router = express.Router();

// User routs
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);
router.get('/user', userAuth.isLoggedIn, userController.userPage);

// Collection routes
router.get('/collections', collectionController.getAllCollections);
router.post('/collections/seed', collectionController.seedCollections);
router.get(
  '/collections/:collectionId',
  collectionController.getCollectionById
);
router.get('/my-collections', userAuth.isLoggedIn, getUserCollections);
router.post(
  '/collections/new',
  userAuth.isLoggedIn,
  collectionController.createCollection
);
router.put(
  '/collections/:collectionId',
  userAuth.isLoggedIn,
  collectionController.updateCollection
);
router.delete(
  '/collections/:collectionId',
  userAuth.isLoggedIn,
  collectionController.deleteCollection
);
router.post(
  '/collections/:collectionId/like',
  userAuth.isLoggedIn,
  collectionController.likeCollection
);
router.post(
  '/collections/:collectionId/unlike',
  userAuth.isLoggedIn,
  collectionController.unlikeCollection
);

// Link routes
router.post('/links', userAuth.isLoggedIn, linkController.createLink); // Only authorized user can add link
router.get('/links', linkController.getAllLinks);
router.get('/links/:linkId', linkController.getLinkById);
router.put(
  '/links/:linkId',
  userAuth.isLoggedIn,
  isLinkOwner,
  linkController.updateLink
); // Only a logged in user and owner can edit their link.
router.delete(
  '/links/:linkId',
  userAuth.isLoggedIn,
  isLinkOwner,
  linkController.deleteLink
); // Only a logged in user and owner can delete their link.

// AI Search route
const aiSearchRoute = require('../routes/aiSearch');
router.use('/ai-search', aiSearchRoute);

module.exports = router;
