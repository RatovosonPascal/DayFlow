import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ username: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setEditedUser({ username: response.data.username, email: response.data.email });
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
        console.error(err);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Mettre à jour le profil
  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put("http://localhost:8080/api/auth/user/update", editedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setShowModal(false); // Fermer la pop-up
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="card p-4 shadow-lg flex-grow-1">
        <h2 className="text-center mb-4">Profil de l'utilisateur</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {user ? (
          <div>
            <p><strong>Nom:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Bouton Modifier */}
            <button className="btn btn-warning mx-auto d-block mt-3" onClick={() => setShowModal(true)}>
              Modifier le profil
            </button>

            {/* Bouton Déconnexion */}
            <button className="btn btn-danger mx-auto d-block mt-3" style={{ width: "200px" }} onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <p className="text-center">Chargement des informations...</p>
        )}
      </div>

      {/* Fenêtre pop-up pour modifier le profil */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le profil</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedUser.username}
                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn btn-primary" onClick={handleUpdateProfile}>Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
