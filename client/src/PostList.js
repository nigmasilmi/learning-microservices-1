import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';

const PostList = () => {
  const getPosts = async () => {
    const result = await axios.get('http://localhost:4002/posts');
    return setPosts(result.data);
  };

  const [posts, setPosts] = useState({});
  // console.log('posts', posts);
  useEffect(() => {
    getPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      key={Math.random()}
      className="card"
      style={{ width: '45%', marginBottom: '20px' }}
    >
      <div className="card-body" key={post.id}>
        {post.title}
        <CommentsList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
