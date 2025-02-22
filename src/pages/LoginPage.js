import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Se connecter</h2>

       
        {error && <div className="alert alert-danger">{error}</div>}

       
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
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Affiche ou masque l'icône en fonction de l'état */}
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
