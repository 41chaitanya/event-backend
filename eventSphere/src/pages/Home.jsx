import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import EventList from '../components/EventList';
import EventService from '../services/event.service';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAllEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      <section style={{ textAlign: 'center', padding: '50px', background: 'linear-gradient(to right, #4A90E2, #D0021B)', color: 'white', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>Welcome to EventSphere</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 20px' }}>
          Discover exciting events in your area or create your own!
        </p>
        <Link 
          to="/new-event" 
          style={{ display: 'inline-block', padding: '10px 20px', background: 'white', color: '#333', fontWeight: 'bold', borderRadius: '6px', textDecoration: 'none', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }}
        >
          Create an Event
        </Link>
      </section>
      
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Upcoming Events</h2>
        </div>
        <EventList events={events} loading={loading} error={error} />
      </section>
    </Layout>
  );
};

export default Home;
