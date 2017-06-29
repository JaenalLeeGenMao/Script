var React = require('react');
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
    return (
        <div className="battle-form">
            <img className="avatar" src={props.image} alt={props.username} />
            <p>@{props.username}</p>
            {props.children}
        </div>
    )
}

module.exports = PlayerPreview;
