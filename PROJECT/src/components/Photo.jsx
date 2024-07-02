import React, { useState } from 'react'

const Photo = ({ photo, photos, setPhotos }) => {
    const [isUpdatePhoto, setIsUpdatePhoto] = useState(false);
    const [updatePhotoContent, setUpdatePhotoContent] = useState(
        {
            title: '',
            url: ''
        }
    );

    const updatePhoto = () => {
        if (updatePhotoContent.title == '' && updatePhotoContent.url == '') {
            setIsUpdatePhoto(false);
            return;
        };

        const updatePhotoObject = {
            id: photo.id,
            albumId: photo.albumId,
            title: updatePhotoContent.title == '' ? photo.title : updatePhotoContent.title,
            url: updatePhotoContent.url == '' ? photo.url : updatePhotoContent.url,
            thumbnailUrl: updatePhotoContent.url == '' ? photo.url : updatePhotoContent.url
        };

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePhotoObject),
        };

        fetch(`http://localhost:3000/photos/${photo.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setPhotos(photos.map(currentPhoto => photo.id == currentPhoto.id ? data : currentPhoto));
                setIsUpdatePhoto(false);
                setUpdatePhotoContent({
                    title: '',
                    url: ''
                });
            })
    };

    const deletePhoto = (id) => {
        fetch(`http://localhost:3000/photos/${id}`, { method: 'DELETE', })
            .then(() => {
                setPhotos(photos.filter(photo => photo.id !== id));
            })
    };

    const handleChange = (field, value) => {
        setUpdatePhotoContent(prevDetails => ({
            ...prevDetails,
            [field]: value,
            thumbnailUrl: prevDetails.url.replace("/600/", "/150/")
        }));
    };

    return (
        <div className="photo">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-overlay">
                <span className='photo-info'>{photo.title}</span>
                <div className='buttons_div'>
                    <button onClick={() => deletePhoto(photo.id)}> 🗑️</button>
                    <button onClick={() => setIsUpdatePhoto(!isUpdatePhoto)}>✏️</button>
                </div>
                {isUpdatePhoto && (
                    <div className='edit-photo-form'>
                        <input type="text" value={updatePhotoContent.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of photo" />
                        <input type="text" value={updatePhotoContent.url} onChange={(e) => handleChange('url', e.target.value)} placeholder="Enter url of photo" />
                        <button onClick={updatePhoto}>Update Photo</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Photo;