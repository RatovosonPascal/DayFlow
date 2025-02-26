import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Tous les champs doivent être remplis");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/profilpage");
      }
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setError("Veuillez entrer votre email");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", { email: forgotPasswordEmail });
      setSuccessMessage("Un email de réinitialisation a été envoyé.");
      setShowForgotPassword(false);
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email. Vérifiez votre adresse.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Se connecter</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!showForgotPassword ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Entrez votre email" />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Entrez votre mot de passe" />
              <span onClick={togglePasswordVisibility} style={{ position: "absolute", top: "70%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
            <p className="mt-3 text-center">
              <a href="#" onClick={() => setShowForgotPassword(true)} className="text-primary">Mot de passe oublié ?</a>
            </p>
          </form>
        ) : (
          <div>
            <h5 className="text-center">Réinitialisation du mot de passe</h5>
            <input type="email" className="form-control mb-3" placeholder="Entrez votre email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} />
            <button onClick={handleForgotPassword} className="btn btn-primary w-100">Envoyer</button>
            <p className="mt-3 text-center">
              <a href="#" onClick={() => setShowForgotPassword(false)} className="text-secondary">Retour à la connexion</a>
            </p>
          </div>
        )}
        <p className="mt-3 text-center">
          Vous n'avez pas de compte ? <a href="/register" className="text-primary">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
