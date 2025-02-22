import React, { useEffect, useState } from "react";
import axios from "axios";

const CalendarEvents = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const todayResponse = await axios.get("http://localhost:8080/api/calendar/TodayEvents");
        const futureResponse = await axios.get("http://localhost:8080/api/calendar/FutureEvents");

        setTodayEvents(todayResponse.data);
        setFutureEvents(futureResponse.data);
      } catch (err) {
        setError("Erreur lors de la récupération des événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Événements d'aujourd'hui</h2>
      {todayEvents.length === 0 ? (
        <p>Aucun événement aujourd'hui.</p>
      ) : (
        <ul>
          {todayEvents.map((event) => (
            <li key={event.id}>
            <strong>{event.summary}</strong> -{" "}
            {typeof event.start === "object"
              ? JSON.stringify(event.start) // Convert object to string for debugging
              : event.start?.dateTime || event.start?.date}
          </li>
          
          ))}
        </ul>
      )}

      <h2>🔮 Événements futurs</h2>
      {futureEvents.length === 0 ? (
        <p>Aucun événement à venir.</p>
      ) : (
        <ul>
          {futureEvents.map((event) => (
            <li key={event.id}>
              <strong>{event.summary}</strong> - {event.start?.dateTime || event.start?.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarEvents;
