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
      <div style={{ backgroundColor: '#FEE2E2', borderLeft: '4px solid #EF4444', color: '#B91C1C', padding: '16px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <p>{error || 'Event not found'}</p>
      </div>
    </Layout>
  );

  const hasRSVP = currentUser && event.attendees.includes(currentUser.id);
  const isOrganizer = currentUser && event.organizerId._id === currentUser.id;

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#2563EB', padding: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{event.name}</h1>
          <p style={{ color: '#93C5FD', marginTop: '8px' }}>Organized by {event.organizerId.name}</p>
        </div>

        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600' }}>About this event</h3>
          <p>{event.description || 'No description provided.'}</p>

          <h3 style={{ fontSize: '20px', fontWeight: '600', marginTop: '16px' }}>Attendees ({event.attendees.length})</h3>
          <p>{event.attendees.length > 0 ? `${event.attendees.length} people are attending this event.` : 'Be the first to RSVP!'}</p>

          <div style={{ marginTop: '16px', backgroundColor: '#F3F4F6', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500' }}>Date & Time</h3>
            <p>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')} at {format(new Date(event.date), 'h:mm a')}</p>

            <h3 style={{ fontSize: '18px', fontWeight: '500', marginTop: '16px' }}>Location</h3>
            <p>{event.location}</p>

            {!isOrganizer && (
              <button 
                onClick={handleRSVP} 
                disabled={hasRSVP || rsvpLoading || !isAuthenticated()} 
                style={{ width: '100%', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', backgroundColor: hasRSVP ? '#10B981' : '#2563EB', color: 'white', cursor: hasRSVP ? 'default' : 'pointer', marginTop: '16px', border: 'none', opacity: rsvpLoading ? '0.5' : '1' }}>
                {rsvpLoading ? 'Processing...' : hasRSVP ? 'You are attending' : 'RSVP to this event'}
              </button>
            )}

            {!isAuthenticated() && <p style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center', color: '#6B7280' }}>Please log in to RSVP to this event.</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;