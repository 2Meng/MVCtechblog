const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', usersRoutes);
router.use('/posts', postRoutes);

module.exports = router;
