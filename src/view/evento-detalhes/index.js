import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './evento-detalhes.css';

import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';

import NavBar from '../../components/navbar';

export default function EventoDetalhes() {
    return (
        <>
            <NavBar />
            <div className="container-fluid">
                <div className="row">
                    <img src="https://via.placeholder.com/150x100" className="img-banner" alt="Banner" />

                    <div className="row mt-5 d-flex justify-content-around">
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5><strong>Tipo</strong></h5>
                            <span className="mt-3">Festa</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-calendar-alt fa-2x"></i>
                            <h5><strong>Data</strong></h5>
                            <span className="mt-3">10/10/2019</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-clock fa-2x"></i>
                            <h5><strong>Hora</strong></h5>
                            <span className="mt-3">00:00:00</span>
                        </div>
                    </div>
                </div>

                <div className="row box-detalhes mt-5">
                    <h5 className="text-center"><strong>Detalhes do evento</strong></h5>
                    <p className="text-justify p-3">É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição mais ou menos normal de letras, ao contrário do uso de "Conteúdo aqui, conteúdo aqui", tornando-o texto legível. Muitas ferramentas de publicação electrónica e editores de páginas web usam actualmente o Lorem Ipsum como o modelo de texto usado por omissão, e uma pesquisa por "lorem ipsum" irá encontrar muitos websites ainda na sua infância. Várias versões têm evoluído ao longo dos anos, por vezes por acidente, por vezes propositadamente (como no caso do humor).</p>
                </div>

                <Link to='' className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
            </div>
        </>
    );
}