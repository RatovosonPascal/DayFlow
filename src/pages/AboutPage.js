import React from 'react';

const AboutPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-3">À propos de l'application</h2>
        <p className="text-muted text-center lead">
          Voici une brève description de l'application. Elle vous aide à gérer vos tâches, organiser votre emploi du temps et améliorer votre productivité.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
