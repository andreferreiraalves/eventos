import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './evento-cadastro.css';

import firebase from '../../config/firebase';
import NavBar from '../../components/navbar';

function EventoCadastro(props) {
    const idEvento = props.match.params.id;

    const [carregando, setCarregando] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    const [fotoAtual, setfotoAtual] = useState();
    const [fotoNova, setfotoNova] = useState();

    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
        if (idEvento) {
            firebase.firestore().collection('eventos').doc(idEvento).get()
            .then(resultado => {
                const dado = resultado.data();
                setTitulo(dado.titulo);
                setTipo(dado.tipo);
                setDetalhes(dado.detalhes);
                setData(dado.data);
                setHora(dado.hora);
                setfotoAtual(dado.foto);
            });
        }
    }, []);

    function atualizar() {
        setMsgTipo('');
        setCarregando(1);

        if (fotoNova)
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova)

        db.collection('eventos').doc(idEvento).update({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            foto: fotoNova ? fotoNova.name : fotoAtual
        })
            .then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            })
            .catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            });
    }

    function cadastrar() {
        setMsgTipo('');
        setCarregando(1);

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova)
            .then(() => {
                db.collection('eventos').add({
                    titulo,
                    tipo,
                    detalhes,
                    data,
                    hora,
                    usuario: usuarioEmail,
                    visualizacoes: 0,
                    foto: fotoNova.name,
                    publico: 1,
                    criaca: new Date()
                })
                    .then(() => {
                        setMsgTipo('sucesso');
                        setCarregando(0);
                    })
                    .catch(erro => {
                        setMsgTipo('erro');
                        setCarregando(0);
                    });
            });

    }

    return (
        <>
            <NavBar />
            <div className="row m-2">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">
                        {
                            idEvento ?
                                'Atualizar Evento'
                                :
                                'Novo Evento'
                        }
                    </h3>
                </div>

                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="test" className="form-control" value={titulo && titulo} />
                    </div>

                    <div className="form-group">
                        <label>Tipo de Evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo} >
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descrição do evento:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes} />
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data} />
                        </div>

                        <div className="col-6">
                            <label>Hora:</label>
                            <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload da foto: {idEvento && '(caso queira manter a mesma foto, não precisa escolher uma nova imagem)'}</label>
                        <input onChange={(e) => setfotoNova(e.target.files[0])} type="file" className="form-control" />
                    </div>

                    <div className="row">
                        {
                            carregando > 0
                                ? <div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden">Loading...</span></div>
                                : <button onClick=
                                    {
                                        idEvento ?
                                            atualizar
                                            :
                                            cadastrar
                                    }

                                    type="button" className="btn btn-lg btn-block mt-3 btn-cadastro">
                                    {
                                        idEvento ?
                                            'Atualizar evento'
                                            :
                                            'Publicar evento'
                                    }
                                </button>
                        }
                    </div>

                </form>

                <div className="msg-login text-center mt-2">
                    {msgTipo === 'sucesso' && <span><strong>WOW!</strong> Evento publicado ! &#128526; </span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento ! &#128546; </span>}
                </div>
            </div>
        </>
    );
}

export default EventoCadastro;