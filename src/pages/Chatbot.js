import React, { useState } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un indicateur de chargement

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Ajout du message de l'utilisateur à l'historique
    setChatHistory((prev) => [...prev, { sender: 'user', message: userMessage }]);
    setIsLoading(true); // Activation du chargement

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: userMessage }), // ✅ Correction ici
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse API:', data);

      // ✅ Correction pour récupérer la réponse correcte
      const botMessage = data.status === 'success' ? data.message.response : "Désolé, une erreur est survenue.";

      setChatHistory((prev) => [...prev, { sender: 'bot', message: botMessage }]);

    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
      setChatHistory((prev) => [...prev, { sender: 'bot', message: "Erreur de communication avec le serveur." }]);
    }

    setUserMessage('');
    setIsLoading(false); // Désactivation du chargement
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-3" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center">Chatbot</h3>

        {/* ✅ Zone d'affichage des messages */}
        <div className="chat-history border rounded p-2 mb-3" style={{ height: "300px", overflowY: "auto" }}>
          {chatHistory.map((entry, index) => (
            <div key={index} className={`p-2 mb-2 rounded ${entry.sender === 'user' ? 'bg-light text-end' : 'bg-primary text-white text-start'}`}>
              <strong>{entry.sender === 'user' ? 'Vous' : 'Chatbot'} :</strong> {entry.message}
            </div>
          ))}
          {isLoading && <div className="text-center text-secondary">⏳ Chatbot réfléchit...</div>}
        </div>

        {/* ✅ Zone d'entrée utilisateur */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tapez votre message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Envoi avec "Entrée"
            disabled={isLoading} // Désactivation pendant le chargement
          />
          <button onClick={sendMessage} className="btn btn-primary" disabled={isLoading || userMessage.trim() === ''}>
            {isLoading ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
