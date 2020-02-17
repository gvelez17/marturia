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
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import NotFound from './pages/NotFound';

const store = createStore(rootReducer, composeWithDevTools());

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <App />
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
