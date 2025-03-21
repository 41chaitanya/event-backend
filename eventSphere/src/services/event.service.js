import api from './api';

const EventService = {
  getAllEvents: async () => {
    const response = await api.get('/events/');
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  rsvpToEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/rsvp`);
    return response.data;
  },

  // Additional methods can be added for updating or deleting events if needed
};

export default EventService;