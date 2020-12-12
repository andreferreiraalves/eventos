import React, { useState } from 'react';
import './usuario-novo.css'

import firebase from '../../config/firebase';
import 'firebase/auth';

function NovoUsuario() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [msgTipo, setMsgTipo] = useState('')
    const [msg, setMsg] = useState('')

    function cadastrar() {
        setMsgTipo(null)

        if (!email || !senha) {
            setMsgTipo('erro')
            setMsg('Você precisa informar o e-mail e senha !')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(resultado => {
                setMsgTipo('sucesso')
            })
            .catch(erro => {

                switch (erro.message) {
                    case 'Password should be at least 6 characters':
                        setMsg('A senha deve ter pelo menos 6 caracteres!');
                        break;
                    case 'The email address is already in use by another account.':
                        setMsg('Este email já está sendo utilizado por outro usuário!');
                        break;
                    case 'The email address is badly formatted.':
                        setMsg('O formato do seu email é inválido!');
                        break;
                    default:
                        setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                        break;
                }

                setMsgTipo('erro')
            })
    }

    return (
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />

                <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 btn-cadastro">Cadastrar</button>

                <div className="msg-login text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WOW!</strong>Usuário cadastrado com sucesso ! &#128526; </span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong>{msg} ! &#128546; </span>}
                </div>
            </form>
        </div>
    );
}

export default NovoUsuario;