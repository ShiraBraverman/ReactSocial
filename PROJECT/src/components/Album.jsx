import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Album = ({ album, searchCriteria }) => {
  const navigate = useNavigate();
  const handleAlbumClick = (() => {
    navigate(`${album.id}/photos`, { state: album });
  });

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

  return (
    <div>
      {(album.title.toLowerCase().includes(searchCriteria) || album.id.toString().includes(searchCriteria)) &&
        <div key={album.id}>
          <span className='inputAlbum album-overlay' onClick={() => handleAlbumClick()}>{album.id}. {highlightSearchTerm(album.title)}</span>
        </div>}
    </div>
  );
};

export default Album;