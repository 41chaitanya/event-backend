import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import EventService from '../services/event.service';
import { useAuth } from '../contexts/AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await EventService.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to load event details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    if (!isAuthenticated()) {
      toast.error('Please log in to RSVP');
      return;
    }

    setRsvpLoading(true);
    try {
      await EventService.rsvpToEvent(id);
      // Update the event data to reflect the new RSVP
      const updatedEvent = await EventService.getEventById(id);
      setEvent(updatedEvent);
      toast.success('You are now attending this event!');
    } catch (error) {
      toast.error('Failed to RSVP. Please try again.');
      console.error(error);
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) return (
    <Layout>
      <Loading />
    </Layout>
  );

  if (error || !event) return (
    <Layout>
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
        <p>{error || 'Event not found'}</p>
      </div>
    </Layout>
  );

  // Check if current user has already RSVP'd
  const hasRSVP = currentUser && event.attendees.includes(currentUser.id);
  // Check if current user is the organizer
  const isOrganizer = currentUser && event.organizerId._id === currentUser.id;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">{event.name}</h1>
          <p className="text-primary-100 mt-2">
            Organized by {event.organizerId.name}
          </p>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">About this event</h3>
                <p>{event.description || 'No description provided.'}</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Attendees ({event.attendees.length})</h3>
                {/* If you have attendee details, you can display them here */}
                <p className="text-gray-600">
                  {event.attendees.length > 0 
                    ? `${event.attendees.length} people are attending this event.`
                    : 'Be the first to RSVP to this event!'}
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Date & Time</h3>
                  <p className="text-gray-600">
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-gray-600">
                    {format(new Date(event.date), 'h:mm a')}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
                
                {!isOrganizer && (
                  <button 
                    onClick={handleRSVP}
                    disabled={hasRSVP || rsvpLoading || !isAuthenticated()}
                    className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium ${
                      hasRSVP 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50`}
                  >
                    {rsvpLoading 
                      ? 'Processing...' 
                      : hasRSVP 
                        ? 'You are attending' 
                        : 'RSVP to this event'}
                  </button>
                )}
                
                {!isAuthenticated() && (
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Please log in to RSVP to this event.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;