import { React, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';

const Post = ({ post, posts, searchCriteria, updatePostToShow, userId, postInfo, setPostInfo }) => {
    const navigate = useNavigate();
    const [isUpdatePost, setIsUpdatePost] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [updatePostContent, setUpdatePostContent] = useState(
        {
            title: '',
            body: ''
        }
    );

    const deletePost = (id) => {
        fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE', })
            .then(() => {
                updatePostToShow(posts.filter(post => post.id !== id));
            })
    };

    const updatePost = () => {
        if (updatePostContent.title == '' && updatePostContent.body == '') {
            setIsUpdatePost(false);
            return;
        };

        const updatePostObject = {
            id: post.id,
            userId: post.userId,
            title: updatePostContent.title == '' ? post.title : updatePostContent.title,
            body: updatePostContent.body == '' ? post.body : updatePostContent.body
        };

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePostObject),
        };

        fetch(`http://localhost:3000/posts/${post.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                const updatePosts = posts.map(currentPost => post.id == currentPost.id ? data : currentPost);
                updatePostToShow(updatePosts);
                setIsUpdatePost(false);
                setUpdatePostContent({
                    title: '',
                    body: ''
                });
            })
    };

    const handleChange = (field, value) => {
        setUpdatePostContent(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    const handlePostClick = () => {
        setShowComments(false)
        setIsUpdatePost(false)
        if (postInfo == post.id) {
            setPostInfo(-1);
            navigate(`../users/${userId}/posts`);
        }
        else {
            setPostInfo(post.id);
            navigate(`../users/${userId}/posts/${post.id}`);
        }
    };

    const highlightSearchTerm = (title) => {
        const index = title.toLowerCase().indexOf(searchCriteria.toLowerCase());
        if (index !== -1) {
            return (
                <span>
                    {title.substring(0, index)}
                    <strong className="searchTitle">{title.substring(index, index + searchCriteria.length)}</strong>
                    {title.substring(index + searchCriteria.length)}
                </span>
            );
        }
        return title;
    };

    const handleComments = () => {
        if (showComments) {
            navigate(".")
            setShowComments(false)
        }
        else {
            setShowComments(true);
            navigate("comments");
        }
    };

    return (
        <div>
            {(post.title.toLowerCase().includes(searchCriteria) || post.id.toString().includes(searchCriteria)) &&
                <div className='post-comments' key={post.id}>
                    <span className='inputPost post-overlay' onClick={() => handlePostClick()}>{post.id}.  {highlightSearchTerm(post.title)}</span>
                    {postInfo == post.id &&
                        <div>
                            {userId == post.userId && <div>
                                <span className='inputPost'>{post.body}</span>  <button onClick={() => deletePost(post.id)}> 🗑️ </button>
                                <button onClick={() => setIsUpdatePost(!isUpdatePost)}>✏️</button>
                                {isUpdatePost && (
                                    <div>
                                        <input type="text" value={updatePostContent.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of post" className='inputItem' />
                                        <input type="text" value={updatePostContent.body} onChange={(e) => handleChange('body', e.target.value)} placeholder="Enter body of post" className='inputItem' />
                                        <button onClick={updatePost}>Update Post</button>
                                    </div>)}
                            </div>}
                            <button className='btn' onClick={() => handleComments()}>show comments</button>
                            {showComments && < Outlet />}
                        </div>}
                </div>
            }
        </div>
    )
}

export default Post