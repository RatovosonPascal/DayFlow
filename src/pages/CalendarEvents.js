import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const CalendarEvents = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const todayResponse = await axios.get("http://localhost:8080/api/calendar/TodayEvents");
        const futureResponse = await axios.get("http://localhost:8080/api/calendar/FutureEvents");

        setTodayEvents(todayResponse.data);
        setFutureEvents(futureResponse.data);
      } catch (err) {
        setError("Erreur lors de la récupération des événements.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="card p-4 shadow-lg flex-grow-1">
        <h2 className="text-center mb-4">📅 Événements</h2>

        {loading && <p className="text-center">Chargement des événements...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Événements d'aujourd'hui */}
        <h3 className="mt-3">Événements d'aujourd'hui</h3>
        {todayEvents.length === 0 ? (
          <p>Aucun événement aujourd'hui.</p>
        ) : (
          <ul className="list-group">
            {todayEvents.map((event) => (
              <li key={event.id} className="list-group-item">
                <strong>{event.summary}</strong> -{" "}
                {new Date(event.start.dateTime?.value || event.start.date?.value).toLocaleString()}
              </li>
            ))}
          </ul>
        )}

        {/* Événements futurs */}
        <h3 className="mt-4">🔮 Événements futurs</h3>
        {futureEvents.length === 0 ? (
          <p>Aucun événement à venir.</p>
        ) : (
          <ul className="list-group">
            {futureEvents.map((event) => (
              <li key={event.id} className="list-group-item">
                <strong>{event.summary}</strong> -{" "}
                {new Date(event.start.dateTime?.value || event.start.date?.value).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        {/* Bouton retour profil */}
        <div className="text-center mt-auto mb-3">
        <button className="btn btn-primary mt-4" onClick={() => navigate("/profilpage")}>
          Retour au profil
        </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarEvents;
