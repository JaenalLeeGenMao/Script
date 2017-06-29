var React = require('react');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./player-preview');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState(function() {
            return {
                username: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }

    render () {
        return (
            <form className="battle-form" onSubmit={this.handleSubmit}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input onChange={this.handleChange} value={this.state.username} id={this.props.id} type="text" placeholder="Github Username . . ." />
                <button type="submit" className="button">Submit</button>
            </form>
        )
    }
}

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }

    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        });
    }

    render() {
        var match = this.props.match;
        var playerOne = this.state.playerOneName;
        var playerTwo = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
            <div className="battle-container">
                {!playerOne && <PlayerInput id="playerOne" label="player One" onSubmit={this.handleSubmit}/>}
                {playerOneImage !== null &&
                    <PlayerPreview
                        id='playerOne'
                        image={this.state.playerOneImage}
                        username={this.state.playerOneName}
                        >
                        <button onClick={this.handleReset.bind(this, 'playerOne')} className="reset" type="submit">reset</button>
                    </PlayerPreview>}
                {!playerTwo && <PlayerInput id="playerTwo" label="player Two" onSubmit={this.handleSubmit}/>}
                {playerTwoImage !== null &&
                    <PlayerPreview
                        id='playerTwo'
                        image={this.state.playerTwoImage}
                        username={this.state.playerTwoName}
                        >
                        <button onClick={this.handleReset.bind(this, 'playerTwo')} className="reset" type="submit">reset</button>
                    </PlayerPreview>}
            </div>
            <div>
                {playerOneImage && playerTwoImage &&
                    <Link
                    className="button"
                    to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOne + '&playerTwoName=' + playerTwo
                    }}>
                        Battle
                    </Link>}
            </div>
            </div>
        )
    }
}

module.exports = Battle;

























// var React = require('react');
//
// class PlayerInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: ''
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         var value = event.target.value;
//         this.setState(function() {
//             return {
//                 username: value
//             }
//         })
//     }
//
//     handleSubmit(event) {
//         event.preventDefault();
//         this.props.onSubmit(this.props.id, this.state.username);
//     }
//
//     render () {
//         return (
//             <form className="battle-form" onSubmit={this.handleSubmit}>
//                 <label htmlFor="username">{this.props.label}</label>
//                 <input onChange={this.handleChange} value={this.state.username} id="username" placeholder="Github Username" autoComplete="off" type="text"/>
//                 <button className="button" type="submit">Submit</button>
//             </form>
//         )
//     }
// }
//
// class Battle extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             playerOneName: '',
//             playerTwoName: '',
//             playerOneImage: null,
//             playerTwoImage: null
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleSubmit(id, username) {
//         this.setState(function() {
//             var newState = {};
//             newState[id + "Name"] = username;
//             newState[id + "Image"] = 'https://github.com/' + username + '.png?size=200';
//             return newState;
//         })
//     }
//
//     render() {
//         var playerOne = this.state.playerOneName;
//         var playerTwo = this.state.playerTwoName;
//         return (
//             <div className="battle-container">
//                 {!playerOne && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit}/>}
//                 {!playerTwo && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
//             </div>
//         )
//     }
// }
//
// module.exports = Battle;
