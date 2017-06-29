var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./player-preview');
var Loading = require('./loading');

function Player(props) {
    var info = props.profile;
    console.log(props.profile);
    return (
        <div>
        <div className="battle-form">
            <h1>{ props.label } < /h1>
            <h2>Score: {props.score} </h2>
        </div>
        <PlayerPreview username={info.login} image={info.avatar_url} />
        </div>
    )
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        var players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(players) {
            if (players === null) {
                return this.setState(function() {
                    return {
                        error: 'Looks like there was an error. Check that both users exist on Github.',
                        loading: false,
                    }
                });
            }
            else {
                this.setState(function() {
                    return {
                        error: null,
                        winner: players[0],
                        loser: players[1],
                        loading: false,
                    }
                });
            }             

        }.bind(this)).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

        if (loading === true) {
          return <Loading />
        }

        if (error) {
          return (
            <div>
              <p>{error}</p>
              <Link to='/battle'>Reset</Link>
            </div>
          )
        }

        return (
            <div className = "battle-container" >
            <Player label = "Winner" score = {winner.score} profile = {winner.profile} />
            <Player label = "Loser" score = {loser.score} profile = {loser.profile} />
            </div>
        )
    }
}

module.exports = Results;
