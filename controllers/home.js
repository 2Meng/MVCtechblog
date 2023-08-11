const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
      const postData = await Posts.findByPk(req.params.id, {
          include: [
            { model: Comments, include: { model: Users, attributes: ['name'] }}, 
            { model: Users, attributes: ['name'] }],
      });
      const post = postData.get({ plain: true });

      res.render('post', {
          post: post,
          ...post,
          ...Comments,
          post: [post],
          logged_in: req.session.logged_in,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;