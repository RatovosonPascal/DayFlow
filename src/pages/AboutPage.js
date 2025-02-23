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
            <h4>Voir la méteo</h4>
            <p>Vous pouvez voir la méteo du jour</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
              <Link to="/chatbot" className="text-decoration-none">
                <div className="feature p-3 border rounded">
                  <h4>Chatbot </h4>
                  <p>Discuter tranquillement avec un Chatbot</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link to="/calendarevent" className="text-decoration-none">
                <div className="feature p-3 border rounded">
                  <h4>Calendrier des événements</h4>
                  <p>Consultez et gérez vos événements importants.</p>
                </div>
              </Link>
            </div>
      </div>
    </div>
  </section>
   <div className="container text-center mt-5">

<Link to="/register" className="btn btn-primary btn-lg">
  Register
</Link>

</div>
</div>
  );
};

export default AboutPage;
