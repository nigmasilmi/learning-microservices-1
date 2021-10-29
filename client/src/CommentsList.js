import React from 'react';

const CommentsList = ({ comments }) => {
  const renderedComments = Object.values(comments).map((c) => {
    let content;
    if (c.status === 'approved') {
      content = c.content;
    }
    if (c.status === 'rejected') {
      content = 'This comment was rejected due to moderation rules';
    }
    if (c.status === 'pending') {
      content =
        'This comment is been processed for moderation. Thank you for your patience';
    }

    return <li key={c.content}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
