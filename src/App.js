import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Users from './Users';
import PageNotFound from './PageNotFound';
import Graph from './Graph';

function App() {
  return (
    <div className="App">
      <div className=""><h1>Demo Org</h1></div>
      <div className="outer-container">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Users} />
            <Route exact path="/graph/:id" component={Graph} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
