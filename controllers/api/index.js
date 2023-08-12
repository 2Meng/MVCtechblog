const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postRoutes = require('./postRoutes');
const commentsRoutes = require('./commentsRoutes');


router.use('/users', usersRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentsRoutes)

module.exports = router;
