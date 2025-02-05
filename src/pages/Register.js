import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour gérer l'envoi du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!email || !password || !confirmPassword) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Appel API pour l'enregistrement
      const response = await axios.post("http://localhost:8080/api/auth/register", { email, password });

      // Si l'inscription réussit
      if (response.status === 201) {
        navigate("/login"); // Redirige vers la page de connexion après une inscription réussie
      }
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Créer un compte</h2>

        {/* Affichage des erreurs */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Entrez votre email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirmez votre mot de passe"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>

        <p className="mt-3 text-center">
          Vous avez déjà un compte ? <a href="/login" className="text-primary">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
