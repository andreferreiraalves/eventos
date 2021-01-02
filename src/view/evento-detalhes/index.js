import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './evento-detalhes.css';

import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';

import NavBar from '../../components/navbar';

export default function EventoDetalhes(props) {
    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState();
    const [carregando, setcarregando] = useState(1);
    const usuarioLogado = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        firebase.firestore().collection('eventos').doc(props.match.params.id).get()
            .then(resultado => {
                let dado = resultado.data();
                dado.visualizacoes++;
                setEvento(dado);

                firebase.firestore().collection('eventos').doc(props.match.params.id)
                    .update('visualizacoes', dado.visualizacoes);

                firebase.storage().ref(`imagens/${dado.foto}`).getDownloadURL()
                    .then(url => {
                        setUrlImg(url);
                        setcarregando(0);
                    });
            });
    }, []);

    return (
        <>
            <NavBar />
            <div className="container-fluid">
                {
                    carregando
                        ?
                        <div className="row mt-5"><div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden">Loading...</span></div></div>
                        :
                        <div>
                            <div className="row">
                                <div className="row">
                                    <img src={urlImg} className="img-banner" alt="Banner" />

                                    <div className="col-12 text-right mt-1 visualizacoes">
                                        <i className="fas fa-eye"></i> <span>{evento.visualizacoes}</span>
                                    </div>

                                    <h3 className="text-center mt-5 titulo"><strong>{evento.titulo}</strong></h3>
                                </div>


                                <div className="row mt-5 d-flex justify-content-around">
                                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                        <i className="fas fa-ticket-alt fa-2x"></i>
                                        <h5><strong>Tipo</strong></h5>
                                        <span className="mt-3">{evento.tipo}</span>
                                    </div>

                                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                        <i className="fas fa-calendar-alt fa-2x"></i>
                                        <h5><strong>Data</strong></h5>
                                        <span className="mt-3">{evento.data}</span>
                                    </div>

                                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                        <i className="fas fa-clock fa-2x"></i>
                                        <h5><strong>Hora</strong></h5>
                                        <span className="mt-3">{evento.hora}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row box-detalhes mt-5">
                                <h5 className="text-center"><strong>Detalhes do evento</strong></h5>
                                <p className="text-justify p-3">{evento.detalhes}</p>
                            </div>

                            {
                                (usuarioLogado == evento.usuario) &&
                                <Link to='' className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                            }
                        </div>}
            </div>
        </>
    );
}