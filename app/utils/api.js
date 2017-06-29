var Axios = require('axios');

var id = "4ed1fbacb8c1ed27e8aa";
var sec = "c971246fc83aee1880035b18c329fcfd99b22bf9";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
    return Axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
        return user.data;
    });
}

function getRepos (username) {
    return Axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount (repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore (profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.log(error);
    return null;
}

function getUserData(player) {
    return Axios.all([getProfile(player), getRepos(player)]).then(function (data) {
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    });
}

function sortPlayers (players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    });
}
module.exports = {
    battle: function (players) {
        return Axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError);
    },

    fetchPopularList: function(language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

        return Axios.get(encodedURI).then(function(response) {
            return response.data.items;
        });
    }
}
