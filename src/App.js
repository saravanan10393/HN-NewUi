import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './component/header';
import StoryList from './component/story.list';
import OfflineNotifier from './component/offline';

import './App.css';


export default function App() {
  //let direction = useDirection();
  // if(direction) {
  //   alert(direction);
  // }

  return (
    <BrowserRouter basename="/">
      <div className="app">
        <Redirect to="/topstories" />
        
        <Header />

        <Route path="/:storyType" component={(props) => {
          return <StoryList {...props}/>
        } }/>

        <OfflineNotifier />
      </div>
    </BrowserRouter>
  );
}

/**
 * asdfasd
 * 
 * asdf
 * asdf
 */

function useDirection() {
  let startX = null;
  let currentX = null;
  let [direction, setDirection] = useState("");
  const onStart = (evt) => {
    startX = evt.x;
  };

  const onMove = (evt) => {
    currentX = evt.x;
  };

  const onEnd = (evt) => {
    startX = null;
    currentX = null;
    let diff = currentX - startX;
    if(Math.abs(diff) < 50) return;
    direction = diff > 0 ? "LEFT" : "RIGHT";
    setDirection(direction);
  };

  useEffect(() => {
    document.addEventListener('touchstart', onStart, false);
    return () => document.removeEventListener('touchstart', onStart);
  }, []);

  useEffect(() => {
    document.addEventListener('touchmove', onMove, false);
    return () => document.removeEventListener('touchmove', onMove);
  }, []);

  useEffect(() => {
    document.addEventListener('touchend', onEnd, false);
    return () => document.removeEventListener('touchend', onEnd);
  }, []);

  return direction;
}
