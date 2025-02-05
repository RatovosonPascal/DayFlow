import React, { useState } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Fonction pour gérer l'envoi du message
  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    setChatHistory([...chatHistory, { sender: 'user', message: userMessage }]);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse JSON:', data);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: 'bot', message: data.status === 'success' ? data.message[0].generated_text : "Désolé, une erreur est survenue." }
      ]);
      
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API :", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: 'bot', message: "Erreur lors de la communication avec l'API." }
      ]);
    }

    setUserMessage('');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-3" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center">Chatbot</h3>
        <div className="chat-history border rounded p-2 mb-3" style={{ height: "300px", overflowY: "auto" }}>
          {chatHistory.map((entry, index) => (
            <div key={index} className={`p-2 mb-2 ${entry.sender === 'user' ? 'text-end bg-light' : 'text-start bg-primary text-white'} rounded`}>
              <strong>{entry.sender === 'user' ? 'Vous' : 'Chatbot'} :</strong> {entry.message}
            </div>
          ))}
        </div>
        
        <div className="input-group">
        <input
            type="text"
            className="form-control"
            placeholder="Tapez votre message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Envoie avec Enter
          />
          <button onClick={sendMessage} className="btn btn-primary">Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
