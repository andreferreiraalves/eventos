import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/';

/* Páginas */
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import UsuarioRecuperarSenha from './view/usuario-recupera-senha';
import EventoCadastro from './view/evento-cadastro';
import EventosDetalhe from './view/evento-detalhes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/eventos/:parametro' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/novousuario' component={NovoUsuario} />
        <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
        <Route exact path='/eventocadastro' component={EventoCadastro} />
        <Route exact path='/eventodetalhes' component={EventosDetalhe} />
      </Router>
    </Provider>
  );
}

export default App;
