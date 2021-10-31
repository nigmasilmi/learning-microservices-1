import axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    // la ruta debe cambiar a la ruta especificada en ingress-srv.yaml
    // en este ejemplo, cambiar localhost:5000 por posts.com
    await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-1">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
