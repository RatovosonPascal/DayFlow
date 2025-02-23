import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Stocker le message de succès

  const navigate = useNavigate();
  const location = useLocation();

  // Vérifie si un message a été passé depuis la page Register
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Nettoyer le state après affichage du message pour éviter qu'il reste si l'utilisateur rafraîchit la page
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location]);

  // Fonction pour gérer l'envoi du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification simple
    if (!email || !password) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    try {
      // Appel API pour la connexion
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });

      // Si la connexion réussit (exemple de redirection vers le tableau de bord)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Sauvegarder le token d'authentification
        navigate("/profilpage"); // Redirection vers le dashboard
      }
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  // Fonction pour afficher/masquer le mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Se connecter</h2>

        {/* Affichage du message de succès après inscription */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Affichage des erreurs */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulaire de connexion */}
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

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"} // Change le type en fonction de l'état
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Entrez votre mot de passe"
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "70%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>

        <p className="mt-3 text-center">
          Vous n'avez pas de compte ? <a href="/register" className="text-primary">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
