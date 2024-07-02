import React, { useState, useEffect } from 'react';
import Album from '../components/Album';

const AlbumsList = ({ userId }) => {
    const [albums, setAlbums] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [isAddingAlbum, setIsAddingAlbum] = useState(false);
    const [newAlbum, setNewAlbum] = useState({ title: '' });
    let massege;

    useEffect(() => {
        const url = `http://localhost:3000/albums?userId=${userId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
            })
    }, []);

    const handleChange = (field, value) => {
        setNewAlbum(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    const addAlbum = () => {
        if (newAlbum.title == '') {
            return;
        };

        const newAlbumObject = {
            userId: userId,
            title: newAlbum.title
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAlbumObject),
        };

        fetch(`http://localhost:3000/albums`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setAlbums([...albums, data])
                setIsAddingAlbum(false);
                setNewAlbum({
                    title: '',
                });
            })
    };

    const checkFull = (event) => {
        if (event.target.value === '') setSearchCriteria('');
        else setSearchCriteria(event.target.value);
    };

    if (!albums) {
        return <h1>loading...</h1>;
    }

    if (albums.length === 0) {
        massege = <h1>No albums found.</h1>
    }

    return (
        <div className='albums'>
            {massege}
            <input className='inputItem' type="text" value={searchCriteria} onChange={(event) => checkFull(event)} placeholder="Search by title or number" />
            <button className='addItem' onClick={() => { setIsAddingAlbum(!isAddingAlbum); setNewAlbum({ title: '' }); }}>➕</button>
            {isAddingAlbum && (
                <div>
                    <input type="text" value={newAlbum.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of album" className='inputItem' />
                    <button onClick={addAlbum}>Add Album</button>
                </div>
            )}
            {albums.map((album) => (
                <Album key={album.id} album={album} searchCriteria={searchCriteria} />
            ))}
        </div>
    );
};

export default AlbumsList;