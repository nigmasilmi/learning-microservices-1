import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    // la ruta debe cambiar a la ruta especificada en ingress-srv.yaml
    // en este ejemplo, cambiar localhost:4000 por posts.com
    await axios.post('http://localhost:4000/posts/create', {
      title,
    });
    setTitle('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button className="btn btn-primary mt-2">Create post</button>
      </form>
    </div>
  );
};

export default PostCreate;
