import React, { useEffect, useState } from 'react';

import Portal from '../portal';

import DB from '../../firebase';

import './story.modal.css';

export default function StoryModal(props) {
  let { story } = props;

  useEffect(() => {
    let callback = (evt) => {
      if(evt.key === 'Escape') {
        props.onClose();
      }
    };

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, []);

  return (
    <Portal className="portal">
      <div className="backdrop" onClick={props.onClose}/>
      <div className="modal">
        <div className="modalHeader">
          <h3 className="modalTitle">{story.title}</h3>
          <p className="closeIcon" onClick={props.onClose}>X</p>
        </div>
        <div className="modalContent">
          <CommentList comments={story.kids}/>
        </div>
      </div>
    </Portal>
  );
}

const CommentList = function CommentList(props) {
  return (
    <ul className="commentList">
      {
        props.comments.map((comment) => <Comment key={comment} comment={comment} />)
      }
    </ul>
  );
}

const Comment = React.memo(function Comment(props) {
  let [ comment, setComment ] = useState({});

  let [ showReplies, toggleShowReplies ] = useState(false);

  useEffect(() => {
    DB.child(`item/${props.comment}`)
      .once('value', (value) => {
          setComment(value.val());
      });
  }, []);

  const viewReplies = () => {
    toggleShowReplies(!showReplies);
  }

  return comment.text ? (
    <li className="comment">
      <div className="commentText" contentEditable="false"
        dangerouslySetInnerHTML={{ __html: comment.text }} />
      <ul className="commentFooter">
        <li className="hint">-- by {comment.by}</li>
        {
          comment.kids && comment.kids.length > 0 &&
          <li className="link" onClick={viewReplies}>{ showReplies ? 'Hide' : 'Show' } Replies</li>
        }
      </ul>
      {
        showReplies &&
        <CommentList comments={comment.kids}/>
      }
    </li>
  ) : "...";
});
