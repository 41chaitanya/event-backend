import React from 'react';
import EventCard from './EventCard';
import Loading from './Loading';

const EventList = ({ events, loading, error }) => {
  if (loading) return <Loading />;
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
      <p>{error}</p>
    </div>
  );
  
  if (events.length === 0) return (
    <div className="text-center py-12">
      <h3 className="text-xl text-gray-600">No events found</h3>
      <p className="mt-2 text-gray-500">Check back later or create your own event!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;