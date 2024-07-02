import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import '../css/Comment.css'


const Comments = ({ userEmail }) => {
  const [indexUpdateComment, setIndexUpdateComment] = useState(-1);
  const { userId, postId } = useParams();
  const [comments, setComments] = useState();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState({
    name: '',
    body: ''
  });
  let massege;

  useEffect(() => {
    const url = `http://localhost:3000/comments?postId=${postId}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
  }, []);

  const AddComment = () => {
    if (newComment.name == '' || newComment.body == '') {
      return;
    }
    const newCommentObject = {
      postId: postId,
      name: newComment.name,
      email: userEmail,
      body: newComment.body
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentObject),
    };
    fetch(`http://localhost:3000/comments`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setComments([...comments, data])
        setIsAddingComment(false);
        setNewComment({
          name: '',
          body: ''
        });
      })
  };

  const handleChange = (field, value) => {
    setNewComment(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  if (!comments) {
    return <h1>loading...</h1>
  }

  if (comments.length === 0) {
    massege = <h1>No comments found.</h1>
  }
  return (
    <div>
      {massege}
      <button className='addItem' onClick={() => {
        setIsAddingComment(!isAddingComment);
        setNewComment({ name: '', body: '' })
      }}>➕</button>
      {isAddingComment && (
        <div>
          <input type="text" value={newComment.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter name of comment" className='input' />
          <input type="text" value={newComment.body} onChange={(e) => handleChange('body', e.target.value)} placeholder="Enter body of comment" className='input' />
          <button className='btn' onClick={() => AddComment()}>Add Comment</button>
        </div>
      )}
      <div className='comment-list'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments} userEmail={userEmail} indexUpdateComment={indexUpdateComment} setIndexUpdateComment={setIndexUpdateComment} />
        ))}
      </div>
    </div>
  )
}

export default Comments