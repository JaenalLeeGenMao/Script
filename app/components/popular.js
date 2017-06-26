var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

//Stateless functional Component
function SelectedLanguages (props) {
    var languages = ['All', 'Javascript', 'Ruby', 'Jav', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {languages.map((lang) => {
                return (
                    <li style={lang === props.selectedLanguages ? {color:'#d0021b'}:null} onClick={props.onSelect.bind(null, lang)} key={lang}>
                        {lang}
                    </li>
                )
            })}
            {props.selectedLanguages}
        </ul>
    )
}

// class SelectedLanguages extends React.Component {
//     render() {
//         var languages = ['All', 'Javascript', 'Ruby', 'Jav', 'CSS', 'Python'];
//
//         return (
//             <ul className="languages">
//                 {languages.map(function(lang) {
//                     return (
//                         <li style={lang === this.props.selectedLanguages ? {color:'#d0021b'}:null} onClick={this.props.onSelect.bind(null, lang)} key={lang}>
//                             {lang}
//                         </li>
//                     )
//                 }, this)}
//                 {this.props.selectedLanguages}
//             </ul>
//         )
//     }
// }

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index) {
                return (
                    <li className="popular-item" key={repo.name}>
                        <div className="popular-rank">#{index + 1}</div>
                        <ul>
                            <li>
                                <img className="avatar" src={repo.owner.avatar_url} alt={repo.owner.login} />
                            </li>
                            <li><a href={repo.owner.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            }, this)}
        </ul>
    )
}

SelectedLanguages.propTypes = {
    selectedLanguages: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguages: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguages);
    }

    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguages: lang,
                repos: null
            }
        });

        api.fetchPopularList(lang).then(function(repos) {
            console.log(repos);
            this.setState(function() {
                return {
                    repos: repos
                }
            })
        }.bind(this))
    }
    render() {
        return (
            <div>
                <SelectedLanguages selectedLanguages={this.state.selectedLanguages} onSelect={this.updateLanguage} />
                {!this.state.repos ? <p>Loading...</p>:<RepoGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

module.exports = Popular;
