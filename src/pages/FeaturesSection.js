import React from "react";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  return (
    <section className="features py-5">
      <div className="container text-center">
        <h3 className="mb-4">Fonctionnalités principales</h3>
        <div className="row">
          {/* Section Météo */}
          <div className="col-md-4 mb-4">
            <div className="feature p-3 border rounded">
              <h4>Voir la météo</h4>
              <p>Vous pouvez voir la météo du jour.</p>
            </div>
          </div>

          {/* Section Chatbot */}
          <div className="col-md-4 mb-4">
            <Link to="/chatbot" className="text-decoration-none">
              <div className="feature p-3 border rounded">
                <h4>Chatbot</h4>
                <p>Discuter tranquillement avec un Chatbot.</p>
              </div>
            </Link>
          </div>

          {/* Section Calendrier */}
          <div className="col-md-4 mb-4">
            <Link to="/calendarevent" className="text-decoration-none">
              <div className="feature p-3 border rounded">
                <h4>Calendrier</h4>
                <p>Gérez vos événements et rappels facilement.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
