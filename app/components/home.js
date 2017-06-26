var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <h1>Welcome! Click on the button below to start a battle ..</h1>
                <Link className="button" to="/battle">Battle</Link>
            </div>
        )
    }
}

module.exports = Home;
