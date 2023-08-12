const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComments = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id: blog_id,
        });

        res.status(200).json(newComments);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComments = await Comments.update(
            {
            ...req.body
            },
            {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!updateComments) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(updateComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentsData = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentsData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;