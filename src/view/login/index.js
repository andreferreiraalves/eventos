import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [msgTipo, setMsgTipo] = useState('')

    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(resultado => {
                setMsgTipo('sucesso')
            })
            .catch(erro => {
                setMsgTipo('erro')
            })

    }

    return (
        <div className="login-content d-flex align-items-center">
            <form className="mx-auto">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />

                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />

                <button onClick={logar} className="w-100 btn btn-lg btn-primary btn-block btn-login" type="button">Logar</button>

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WOW!</strong> Vocês está conectado ! &#128526; </span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou o usuário estão conectados ! &#128546; </span>}
                </div>

                <div className="opcoes-login text-center mt-5">
                    <a href="#" className="mx-2">Recuperar Senha</a>
                    <span className="text-white">&#9733;</span>
                    <Link to="/novousuario" className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;