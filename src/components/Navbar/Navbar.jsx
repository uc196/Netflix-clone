import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search_icon.svg';
import bell from '../../assets/bell_icon.svg';
import profile from '../../assets/profile_img.png';
import caret from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navref.current?.classList.add('nav-dark');
      } else {
        navref.current?.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='navbar' ref={navref}>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV shows</li>
          <li>Movies</li>
          <li>News & popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="Search" className='icons' />
        <p>Children</p>
        <img src={bell} alt="Notifications" className='icons' />
        <div className='navbar-profile'>
          <img src={profile} alt="Profile" className='profile' />
          <img src={caret} alt="Dropdown Arrow" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
