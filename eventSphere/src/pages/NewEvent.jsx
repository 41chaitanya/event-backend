import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import EventForm from '../components/EventForm';
import EventService from '../services/event.service';
import { toast } from 'react-toastify';

const NewEvent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateEvent = async (data) => {
    setLoading(true);
    try {
      const createdEvent = await EventService.createEvent(data);
      toast.success('Event created successfully!');
      navigate(`/events/${createdEvent._id}`);
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create event';
      toast.error(message);
      console.error('Create event error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Event</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <EventForm onSubmit={handleCreateEvent} loading={loading} />
        </div>
      </div>
    </Layout>
  );
};

export default NewEvent;