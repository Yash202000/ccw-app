import React from 'react';
import './PostPage.css'; // You can create a CSS file for styling

interface PostProps {
  title: string;
  content: string;
  city: string;
  imageUrl: string;
  published: boolean;
  timestamp: string;
}

const dummyImageBase64 = "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"; // Replace with your actual base64-encoded image

const posts: PostProps[] = [
  {
    title: 'Post 1',
    content: 'This is the content of post 1.',
    city: 'New York',
    imageUrl: dummyImageBase64,
    published: true,
    timestamp: '2023-10-03T13:02:30.876Z',
  },
];

const PostPage: React.FC<PostProps> = ({ title, content, city, imageUrl, published, timestamp }) => {
  return (
    <div className="post-container">
      <img
        src={imageUrl}
        alt="User's Post"
        className="post-image"
      />
      <div className="post-info">
        <p className="post-title">Title:{title}</p>
        <p className="post-content">Content:{content}</p>
        <p className="post-city">City:{city}</p>
        <p className="post-published">{published ? 'Published' : 'Not Published'}</p>
        <p className="post-timestamp">Timestamp:{timestamp}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      {posts.map((post, index) => (
        <PostPage
          key={index}
          title={post.title}
          content={post.content}
          city={post.city}
          imageUrl={post.imageUrl}
          published={post.published}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default App;
