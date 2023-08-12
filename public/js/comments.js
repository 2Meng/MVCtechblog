document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('comment-form');
  const addCommentButton = document.getElementById('add-comment');
  
  addCommentButton.addEventListener('click', () => {
    commentForm.style.display = 'block';
    addCommentButton.style.display = 'none';
  });

  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    const postId = document.querySelector('[data-id]').getAttribute('data-id');

    try {
      const response = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text: commentText }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return;
      } else {
        document.location.reload();
      }
    } catch (err) {
      console.error(err, 'Whoops! Something went wrong!');
    }
  });
});