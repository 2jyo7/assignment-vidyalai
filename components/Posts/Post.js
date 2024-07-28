import PropTypes from 'prop-types';
import React, {  useRef} from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '340px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const UserInfo = styled.div({
  margin: 8,
  fontSize: 14,
  color: '#555',
  display: 'grid',
   justifyContent: 'center'
});

const LogName = styled.div({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'lightGray',
  fontWeight: 'bold',
})

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  top: "40%",
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const { title, url, user } = post;
const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 320,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -320,
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('');
  };

  // console.log(getInitials(user.name));

  return (
    <PostContainer>
        {user && (
          <UserInfo>
            <LogName>
          {` ${getInitials(user.name)}`} 
        </LogName>
          <div>
          <div>  {` ${user.name}`}</div>
           <div> {` ${user.email}`}</div>
        </div>
        </UserInfo>
      )}
      <CarouselContainer>
        <Carousel ref={carouselRef}>
            <CarouselItem >
            <Image src={url} alt={"img1"} />
            <Image src={url} alt={"img2"}  />
            <Image src={url} alt={"img3"} />
             </CarouselItem>
          </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{title}</h2>
        </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.any,
    title: PropTypes.any,
};

export default Post;