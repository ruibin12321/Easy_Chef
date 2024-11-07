import React from 'react';

function Comment(props) {
  return (
    <li className="media">
      <span className="round pt-2"></span>
      <div className="media-body">
        <div className="row d-flex">
          <h6 className="user pt-2">{props.author}</h6>
          <div className="ml-auto">
            <p className="text">{props.timestamp}</p>
          </div>
        </div>
        <p className="reply">{props.content}</p>
        <div className="images mt-2">
        {props.avatar && <img src={props.avatar} alt="avatar" />}
        </div>
        <p className="reply">{props.reply1}</p>
        <p className="reply">{props.reply2}</p>
      </div>
    </li>
  );
}

export default Comment;
