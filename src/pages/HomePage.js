import React from 'react';
import { Link } from "react-router-dom";



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

    <div className="container text-center mt-5">

<Link to="/about" className="btn btn-primary btn-lg">
  Découvrez DayFlow
</Link>

</div>


    </div>
  );
};

export default HomePage;
