"use client";  // Add this line to make the component a Client Component

import React, { useState } from 'react';
import styles from '../../styles/Community.module.css';

export default function Community() {
  // Initial posts state
  const [posts, setPosts] = useState([
    { author: 'Farmer Raj', content: 'What is the best treatment for wheat blight?', date: '2024-08-12' },
    { author: 'Farmer Sunita', content: 'I tried neem oil for rice blast, worked well!', date: '2024-08-13' },
    { author: 'Farmer Akash', content: 'Looking for organic solutions for maize mosaic virus.', date: '2024-08-14' }
  ]);

  // State for new post content
  const [newPostContent, setNewPostContent] = useState('');

  // Handle form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const today = new Date().toISOString().split('T')[0]; // get current date
      const newPost = { author: 'Farmer You', content: newPostContent, date: today };
      setPosts([newPost, ...posts]); // Add the new post to the top
      setNewPostContent(''); // Clear the textarea
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Community Discussions</h2>
      
      <div className={styles.postsList}>
        {posts.map((post, index) => (
          <div key={index} className={styles.postItem}>
            <h3>{post.author}</h3>
            <p>{post.content}</p>
            <p className={styles.postDate}>Posted on: {post.date}</p>
          </div>
        ))}
      </div>
      
      <div className={styles.newPost}>
        <h3>Start a New Discussion</h3>
        <form onSubmit={handlePostSubmit}>
          <textarea 
            placeholder="Share your thoughts..." 
            value={newPostContent} 
            onChange={(e) => setNewPostContent(e.target.value)} 
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.postButton}>Post</button>
        </form>
      </div>
    </div>
  );
}
