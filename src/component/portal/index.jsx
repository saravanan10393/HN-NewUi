/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Portal(props) {
  let [ child, setChild ] = useState(null);
  
  useEffect(() => {
    let node = document.createElement('div');
    node.classList.add(props.className);
    document.body.appendChild(node);
    setChild(ReactDOM.createPortal(props.children, node));
    return () => document.body.removeChild(node);
  }, []);

  return child;
}