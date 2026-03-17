import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const Titlecard = ({ title, category, autoScroll = true }) => {
  const[apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU2YzU1MzBkMmVmNmQ0Y2Y1ZDA5OGRmNGFlOTE5NSIsIm5iZiI6MTc0OTI0NTI4Mi41MjcsInN1YiI6IjY4NDM1ZDYyNjQwMTU5ZGU3ODI5MjI4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5izODUHvHP5DR3H2CpKiwI-TxQDIBdkmn3m-kgRMWQ'
  }
};


  // Wheel scroll to horizontal
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  // Auto scroll
  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
    const cards = cardsRef.current;
    cards.addEventListener('wheel', handleWheel, { passive: false });

    let interval;

    if (autoScroll) {
      const scrollStep = 1;
      const autoScrollFunc = () => {
        if (cards.scrollLeft + cards.clientWidth >= cards.scrollWidth) {
          cards.scrollLeft = 0;
        } else {
          cards.scrollLeft += scrollStep;
        }
      };

      interval = setInterval(autoScrollFunc, 30);
    }

    return () => {
      cards.removeEventListener('wheel', handleWheel);
      if (interval) clearInterval(interval);
    };
  }, [autoScroll]);

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index) => (
        <Link to={`./player/${card.id}`} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path } alt={card.name} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Titlecard;
