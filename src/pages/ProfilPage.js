import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Récupération du token

      if (!token) {
        navigate("/login"); // Redirection vers login si non authentifié
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Stocke les données de l'utilisateur
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
        console.error(err);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Profil de l'utilisateur</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {user ? (
          <div>
            <p><strong>Nom:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            

            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <p className="text-center">Chargement des informations...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilPage;
