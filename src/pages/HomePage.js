import React from 'react';



const HomePage = () => {
  return (
    <div className="home-page">


      
      <section className="hero py-5 bg-light">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="hero-text mb-4 mb-md-0 text-center text-md-left">
            <h2 className="display-4">Votre quotidien simplifié</h2>
            <p className="lead">
              Connectez-vous à Google Calendar, utilisez la reconnaissance vocale et profitez d'une expérience fluide et intuitive.
            </p>
          </div>
          <div className="hero-image">
            <img src="/assets/logo.png" alt="Application en action" className="img-fluid rounded" />
          </div>
        </div>
      </section>

   
      <section className="features py-5">
        <div className="container text-center">
          <h3 className="mb-4">Fonctionnalités principales</h3>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded">
                <h4>Gestion de Calendrier</h4>
                <p>Synchronisez facilement vos événements avec Google Calendar.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded">
                <h4>Reconnaissance Vocale</h4>
                <p>Ajoutez des événements et interagissez avec l'application par commande vocale.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature p-3 border rounded">
                <h4>Text-to-Audio</h4>
                <p>Écoutez vos rappels et événements au format audio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
