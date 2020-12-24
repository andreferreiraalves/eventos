import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';

function NavBar() {
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <i class="far fa-smile-wink text-white fa-2x"></i>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>

                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        {useSelector(state => state.usuarioLogado) > 0 ?

                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Meus Eventos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/eventocadastro">Publicar Evento</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair</a>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/novousuario">Cadastrar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </nav >
    );
}

export default NavBar;