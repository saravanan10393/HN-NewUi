import React from 'react';
import { Link } from 'react-router-dom';

import logo from './ycombinator.png';

import './header.css';

export default function Header() {
  const isActive = (path) => {
    return window.location.pathname.includes(path);
  }
  return (
    <div className="header">
      <div><img className="logo" src={logo} alt="logo"/></div>
      <ul className="tabs">
        <li className={`title ${isActive('topstories') ? 'active' : ''}`}>
          <Link to="/topstories">Top</Link>
        </li>
        <li className={`title ${isActive('beststories') ? 'active' : ''}`}>
          <Link to="/beststories">Best</Link>
        </li>
        <li className={`title ${isActive('newstories') ? 'active' : ''}`}>
          <Link to="/newstories">New</Link>
        </li>
        <li className={`title ${isActive('askstories') ? 'active' : ''}`}>
          <Link to="/askstories">Ask</Link>
        </li>
        <li className={`title ${isActive('showstories') ? 'active' : ''}`}>
          <Link to="/showstories">Show</Link>
        </li>
        <li className={`title ${isActive('jobstories') ? 'active' : ''}`}>
          <Link to="/jobstories">Job</Link>
        </li>
      </ul>
    </div>
  );
}