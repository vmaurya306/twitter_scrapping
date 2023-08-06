import express from 'express';
import getUserTweet from '../controllers/getUserTweet';
import getUserPosts from '../controllers/getUserPosts';
import getAuthCode from '../controllers/fbOauth'
const router = express.Router();
router.get('/twitter/users/:id/tweets', getUserTweet.getUserTweets);
router.get('/facebook/users/:id/posts', getUserPosts.getUserPosts);
router.get('/facebook/user-auth',getAuthCode);

export = router;