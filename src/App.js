import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/';
import { PersistGate } from 'redux-persist/integration/react';

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
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/eventos/:parametro' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/novousuario' component={NovoUsuario} />
          <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
          <Route exact path='/eventocadastro' component={EventoCadastro} />
          <Route path='/eventodetalhes/:id' component={EventosDetalhe} />
          <Route path='/editarevento/:id' component={EventoCadastro} />
        </Router>
      </PersistGate >
    </Provider >
  );
}

export default App;
