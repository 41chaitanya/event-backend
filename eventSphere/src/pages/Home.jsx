import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import EventList from '../components/EventList';
import EventService from '../services/event.service';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

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
      <section className="text-center py-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg shadow-md mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to EventSphere</h1>
        <p className="text-xl max-w-2xl mx-auto mb-6">
          Discover exciting events in your area or create your own!
        </p>
        
        {isAuthenticated() ? (
          <Link 
            to="/new-event" 
            className="inline-block px-6 py-3 bg-white text-primary-700 font-medium rounded-lg shadow hover:bg-gray-100 transition"
          >
            Create an Event
          </Link>
        ) : (
          <Link 
            to="/signup" 
            className="inline-block px-6 py-3 bg-white text-primary-700 font-medium rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        )}
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          {/* Add filters or search here if needed */}
        </div>
        
        <EventList events={events} loading={loading} error={error} />
      </section>
    </Layout>
  );
};

export default Home;