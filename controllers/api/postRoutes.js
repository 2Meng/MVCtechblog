const router = require('express').Router();
const { Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      created_by: req.session.user_id,
    });

    res.status(200).json(newPost);
    console.log(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        created_by: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'Unable to delete post' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;