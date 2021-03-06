import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StoryModal from './story.modal';

import DB from '../../firebase';

import './story.css';

function Placeholder() {
  return (
    <div className="story placeholder">
      <div className="large" />
      <div className="small" />
    </div>
  )
}

export default React.memo(function StoryItem(props){

  let [ story, setStory ] = useState({});

  let [ activeStory, setActiveStory ] = useState("");

  useEffect(() => {
    DB.child(`item/${props.story}`)
      .once('value', (value) => {
          setStory(value.val());
      });
  }, []);

  const openStory = () => {
    if(story.url) {
      window.open(story.url);
    }
  };

  const openComment = () => {
    setActiveStory(story);
  };

  const onCloseComment = () => {
    setActiveStory(null);
  }

  const getDateStr = (timeStamp) => {
    let storyDate = new Date(timeStamp * 1000);
    if(storyDate.toLocaleDateString() === new Date().toLocaleDateString()) {
      return storyDate.toLocaleTimeString();
    }
    return storyDate.toLocaleDateString() + ' - ' + storyDate.toLocaleTimeString();
  };

  return story.title ? (
    <div className="story">
      <h3 className="storyTitle" onClick={openStory}>{story.title}</h3>
      <ul className="hint">
        {
          story.score &&
          <li>{story.score} points</li>
        }
        <li>
          <p className="dot"/>
          <p>{story.type} from  <Link to={`user/${story.by}`} className="link">{story.by}</Link></p>
        </li>
        {/* <li className="dot" />
        <li>{story.type}</li> */}
        {
          story.descendants > 0 &&
          <li className="link" onClick={openComment}>
            <p className="dot"/>
            <p>{story.descendants} comments</p>
          </li>
        }
        <li>
          <p className="dot"/>
          <p>{getDateStr(story.time)}</p>
        </li>
      </ul>
      {
        activeStory &&
        <StoryModal story={activeStory} onClose={onCloseComment}/>
      }
    </div>
  ) : <Placeholder />
});
