import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import '../css/Post.css'

const PostsList = ({ userId }) => {
  const [posts, setPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [postInfo, setPostInfo] = useState(-1);
  const [newPost, setNewPost] = useState(
    {
      title: '',
      body: ''
    });
  let massege;
  useEffect(() => {
    const url = `http://localhost:3000/posts`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
      })
  }, []);

  const handleChange = (field, value) => {
    setNewPost(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const addPost = () => {
    const newPostObject = {
      userId: userId,
      title: newPost.title,
      body: newPost.body,
    };
    if (newPost.title == '' || newPost.body == '') {
      setIsAddingPost(false);
      setNewPost({
        title: '',
        body: ''
      });
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPostObject),
    };
    const url = 'http://localhost:3000/posts';
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => {
        updatePostToShow([...posts, data])
        setIsAddingPost(false);
        setNewPost({
          title: '',
          body: ''
        });
      })
  };

  const updatePostToShow = (post) => {
    setPosts(post);
    setFilteredPosts(post);
  }

  const checkFull = (event) => {
    if (event.target.value == '')
      setSearchCriteria('')
    else
      setSearchCriteria(event.target.value)
  }

  if (!filteredPosts) {
    return <h1>loading...</h1>
  }
  if (filteredPosts.length === 0) {
    massege = <h1>No photos found.</h1>
  }
  return (
    <div className='posts'>
      <button className="btnCenter" id="showPost" onClick={() => setShowMyPosts(!showMyPosts)}>
        {showMyPosts ? 'Show All Posts' : 'Show My Posts'}
      </button>
      {massege}
      <input className='inputItem' type="text" value={searchCriteria} onChange={(event) => { checkFull(event) }} placeholder="Search by title or number" />
      <button className='addItem' onClick={() => {
        setIsAddingPost(!isAddingPost);
        setNewPost({ title: '', body: '' })
      }}>➕</button>
      {isAddingPost && (
        <div>
          <input type="text" value={newPost.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of post" className='inputItem' />
          <input type="text" value={newPost.body} onChange={(e) => handleChange('body', e.target.value)} placeholder="Enter body of post" className='inputItem' />
          <button className='btn' onClick={addPost}>Add Post</button>
        </div>
      )}
      {filteredPosts.map((post) => (
        <div key={post.id}>
          {(!showMyPosts || (showMyPosts && post.userId === userId)) && <Post post={post} posts={posts} searchCriteria={searchCriteria} updatePostToShow={updatePostToShow} userId={userId} postInfo={postInfo} setPostInfo={setPostInfo} />}
        </div>
      ))}

    </div>
  );
};

export default PostsList;