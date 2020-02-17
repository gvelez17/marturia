import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './styles/normalize.css';
import './styles/global.scss';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Victims from './pages/Victims';
import Submit from './pages/Submit';

const store = createStore(rootReducer, composeWithDevTools());

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/victims'>
        <Victims />
      </Route>
      <Route path='/submit'>
        <Submit />
      </Route>
      <Route component={NotFound} />        
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
