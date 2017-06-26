var React = require('react');
var Popular = require('./popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./nav');
var Home = require('./home');
var Battle = require('./battle');
var Switch = ReactRouter.Switch;

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/battle" component={Battle} />
                    <Route path="/popular" component={Popular} />
                    <Route render={function() {
                        return <div> Page not found </div>
                    }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;
