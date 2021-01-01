import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import './home.css';

import NavBar from '../../components/navbar';
import EventoCard from '../../components/evento-card';

function Home({ match }) {
    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaEventos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        if (match.params.parametro) {
            firebase.firestore().collection('eventos')
                .where('usuario', '==', usuarioEmail)
                .get()
                .then(async (resultado) => {
                    await resultado.docs.forEach(doc => {
                        if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                            listaEventos.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        }
                    })

                    setEventos(listaEventos);
                });
        } else {
            firebase.firestore().collection('eventos').get()
                .then(async (resultado) => {
                    await resultado.docs.forEach(doc => {
                        if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                            listaEventos.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        }
                    })

                    setEventos(listaEventos);
                });
        }

    }, [pesquisa]);

    return (
        <>
            <NavBar />


            <div className="row p-3">
                <div className="row my-3 px-5">
                    <h2 className="text-center pb-2">Eventos Publicados</h2>
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento pelo títutlo" />
                </div>

                <div className="row p-3">
                    {
                        eventos.map(item =>
                            <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)
                    }
                </div>

            </div>
        </>
    );
}

export default Home;