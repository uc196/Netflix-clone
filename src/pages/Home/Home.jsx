import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import herobanner from '../../assets/hero_banner.jpg';
import herotitle from '../../assets/hero_title.png';
import playicon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import Titlecard from '../../components/Titlecards/Titlecard';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />

      <div className='hero'>
        <img src={herobanner} alt="" className='bannerimg' />

        <div className="herocaption">
          <img src={herotitle} alt="" className='caption-img' />
          <p>
            Discover movies currently trending, a young man living in Istanbul embarks on a quest
            to save the city from falling into the hands of the enemies.
          </p>

          <div className="herobtns">
            <button className='btn'>
              <img src={playicon} alt="" />
              Play
            </button>
            <button className='btn dark_btn'>
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>

          <Titlecard />
        </div>
      </div>

      <div className="more_cards">
        <Titlecard title={"Blockbuster Movies"} autoScroll={false} category={"top_rated"}/>
        <Titlecard title={"Only on Netflix"} autoScroll={false} category={"now_playing"} />
        <Titlecard title={"Upcoming"} autoScroll={false} category={"popular"} />
        <Titlecard title={"Top picks for you"} autoScroll={false} category={"upcoming"} />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
