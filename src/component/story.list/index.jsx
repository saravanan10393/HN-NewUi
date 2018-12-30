import React, { useState, useEffect, useRef } from 'react';

import DB from '../../firebase';
import Story from '../story';

import './story.list.css';

export default function StoryList(props) {

  let [stories, setStories] = useState([]);
  
  let allStories = useRef([]);
  
  const isValid = (value => Boolean(value));

  useEffect(() => {
    DB.child(props.match.params.storyType)
      .once('value', (value) => {
        allStories.current = value.val();
        setStories(allStories.current.slice(0, 50).filter(isValid));
      });
  }, [props.match.params.storyType]);

  const loadMore = () => {
    let endIndex = stories.length + 50;
    let nextStories = allStories.current.slice(stories.length, endIndex).filter(isValid);
    setStories([...stories, ...nextStories]);
  }

  return (
    <div className="storyList">
      {
        stories.map((story) => <Story key={story} story={story}/>)
      }
      {
        allStories.current.length > 50 &&
        <div className="loadMore">
          <button className="actionButton" onClick={loadMore}>Show more</button>
        </div>
      }
    </div>
  );
}