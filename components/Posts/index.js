import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isSmallerDevice } = useWindowWidth();
  const postsPerPage = isSmallerDevice ? 5 : 10;

  const fetchPosts = async (page) => {
    try {
      const { data: newPosts } = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos', {
        params: { _start: (page - 1) * postsPerPage, _limit: postsPerPage },
      });
  
      const userPromises = newPosts.map((post) => 
        axios.get(`https://jsonplaceholder.typicode.com/users/${post.albumId}`)
      );
  
      const users = await Promise.all(userPromises);
      const postsWithUser = newPosts.map((post, index) => ({
        ...post,
        user: users[index].data,
      }));
  
      setPosts((prevPosts) => [...prevPosts, ...postsWithUser]);
  
      if (postsWithUser.length < postsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  useEffect(() => {
    fetchPosts(page);
  }, [page, isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {posts.length > 0 && hasMore && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
