import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EventList from '../components/EventList';
import Loading from '../components/Loading';
import EventService from '../services/event.service';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventService.getAllEvents();
        const userEvents = allEvents.filter(event => 
          event.organizerId._id === currentUser.id || 
          event.attendees.includes(currentUser.id)
        );
        setEvents(userEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentUser]);

  if (loading) return (
    <Layout>
      <Loading />
    </Layout>
  );

  const createdEvents = events.filter(event => event.organizerId._id === currentUser.id);
  const attendingEvents = events.filter(event => 
    event.attendees.includes(currentUser.id) && event.organizerId._id !== currentUser.id
  );

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {currentUser?.name}</h1>
        <p className="text-gray-600">
          Here's an overview of your events. Manage your created events or check the ones you're attending.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Organizing</h2>
        {createdEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-4">You haven't created any events yet.</p>
            <a href="/new-event" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Create an Event
            </a>
          </div>
        ) : (
          <EventList events={createdEvents} loading={false} />
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Attending</h2>
        {attendingEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-4">You haven't RSVP'd to any events yet.</p>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Explore Events
            </a>
          </div>
        ) : (
          <EventList events={attendingEvents} loading={false} />
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;
