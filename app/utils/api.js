var Axios = require('axios');

module.exports = {
    fetchPopularList: function(language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

        return Axios.get(encodedURI).then(function(response) {
            return response.data.items;
        });
    }
}
