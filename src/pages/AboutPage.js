import React from 'react';
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
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
              <Link to="/chatbot" className="text-decoration-none">
                <div className="feature p-3 border rounded">
                  <h4>Reconnaissance Vocale</h4>
                  <p>Ajoutez des événements et interagissez avec l'application par commande vocale.</p>
                </div>
              </Link>
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
   <div className="container text-center mt-5">

<Link to="/register" className="btn btn-primary btn-lg">
  Découvrez DayFlow
</Link>

</div>
</div>
  );
};

export default AboutPage;
