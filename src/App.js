import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/';

/* Páginas */
import Login from './view/login/'
import NovoUsuario from './view/usuario-novo/'
import Home from './view/home/'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/novousuario' component={NovoUsuario} />
      </Router>
    </Provider>
  );
}

export default App;
