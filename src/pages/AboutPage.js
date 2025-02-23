import React from 'react';
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <section className="features py-5" style={{ backgroundColor: '#f0f8ff' }}>
        <div className="container text-center">
          <h3 className="mb-4" style={{ color: '#1e90ff' }}>Bienvenue dans DayFlow</h3>
          <p className="lead mb-4" style={{ fontSize: '1.2rem', color: '#333' }}>
            **DayFlow** est l'assistant personnel intelligent qui transforme chaque jour en une expérience productive et sereine. Grâce à son interface intuitive et à ses fonctionnalités avancées, vous pouvez gérer votre emploi du temps, recevoir des rappels audio, consulter la météo, et bien plus encore.
          </p>
          <h4 style={{ color: '#1e90ff' }}>Fonctionnalités principales</h4>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1e90ff' }}>
                <h4 style={{ color: '#1e90ff' }}>Voir la météo</h4>
                <p>Consultez la météo du jour pour mieux planifier vos activités. Soyez toujours préparé(e) aux changements climatiques pour organiser votre journée de manière optimale.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1e90ff' }}>
                <h4 style={{ color: '#1e90ff' }}>Chatbot</h4>
                <p>Discutez tranquillement avec notre assistant virtuel pour toute question ou besoin d'assistance. Le chatbot est là pour vous guider et vous fournir des informations en un instant.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1e90ff' }}>
                <h4 style={{ color: '#1e90ff' }}>Calendrier des événements</h4>
                <p>Consultez et gérez facilement vos événements importants. Ne manquez jamais une réunion ou un événement avec nos rappels et notifications bien placés.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container text-center mt-5">
        <Link to="/register" className="btn btn-primary btn-lg">
          Rejoindre DayFlow
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
