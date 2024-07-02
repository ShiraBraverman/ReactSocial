import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Photo from '../components/Photo';
import '../css/Photo.css'

const Photos = () => {
  const { state } = useLocation();
  const { title, id } = state || {};
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '' });

  let massege;
  useEffect(() => {
    loadMorePhotos();
  }, []);

  const loadMorePhotos = () => {
    setLoading(true);
    const url = `http://localhost:3000/photos?albumId=${id}&_page=${page}&_limit=10`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length < 10) {
          setHasMorePhotos(false);
        }
        setPhotos([...photos, ...data]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading photos:', error);
        setLoading(false);
      });
  };

  const addPhoto = () => {
    if (newPhoto.url == '' || newPhoto.title == '') {
      return;
    }
    const newPhotoObject = {
      albumId: id,
      title: newPhoto.title,
      url: newPhoto.url,
      thumbnailUrl: newPhoto.url
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhotoObject),
    };
    fetch(`http://localhost:3000/photos`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setIsAddingPhoto(false);
        setNewPhoto({
          title: '',
          url: '',
        });
        if (!hasMorePhotos) {
          setPhotos([...photos, data]);
        }
      })
  };

  const backToAlbums = () => {
    navigate(`../`);
  };

  const handleChange = (field, value) => {
    setNewPhoto(prevDetails => ({
      ...prevDetails,
      [field]: value,
      thumbnailUrl: prevDetails.url.replace("/600/", "/150/")
    }));
  };

  return (
    <div className="photos-container">
      {massege}
      <h2>{title}</h2>
      <button className="back" onClick={backToAlbums}>Back to All Albums</button>
      <button className='add-photo-button' onClick={() => { setIsAddingPhoto(!isAddingPhoto); setNewPhoto({ url: '', title: '' }); }}>➕ Add Photo</button>
      {isAddingPhoto && (
        <div className='add-photo-form'>
          <input className='add-photo-form' type="text" value={newPhoto.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of photo" />
          <input className='add-photo-form' type="text" value={newPhoto.url} onChange={(e) => handleChange('url', e.target.value)} placeholder="Enter url of photo" />
          <button onClick={addPhoto}>Add Photo</button>
        </div>
      )}
      <div className='photo-list'>
        {photos.map(photo => (
          <Photo key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {hasMorePhotos && !loading ? (
        <button className="view" onClick={loadMorePhotos}>View more</button>
      ) : <h2>No more photos</h2>}
    </div>
  );
};

export default Photos;
