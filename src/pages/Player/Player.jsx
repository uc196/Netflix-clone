import React, { useEffect, useState } from 'react';
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 Hook for navigation

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU2YzU1MzBkMmVmNmQ0Y2Y1ZDA5OGRmNGFlOTE5NSIsIm5iZiI6MTc0OTI0NTI4Mi41MjcsInN1YiI6IjY4NDM1ZDYyNjQwMTU5ZGU3ODI5MjI4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5izODUHvHP5DR3H2CpKiwI-TxQDIBdkmn3m-kgRMWQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [id]); // 👈 added `id` as a dependency for safety

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate('/')} // 👈 Navigate back to homepage
        className="back-arrow"
        style={{ cursor: 'pointer' }} // optional inline styling
      />

      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='Trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}

      <div className="player-info">
        <p><strong>Published:</strong> {apiData.published_at?.slice(0, 10)}</p>
        <p><strong>Title:</strong> {apiData.name}</p>
        <p><strong>Type:</strong> {apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
