import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './component/header';
import StoryList from './component/story.list';
import OfflineNotifier from './component/offline';

import './App.css';


export default function App() {
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
