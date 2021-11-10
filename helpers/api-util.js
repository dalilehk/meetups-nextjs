// Fetching all data from firebase DB
const FIREBASE_URL =
  'https://events-db-e2356-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export async function getAllEvents() {
  const response = await fetch(FIREBASE_URL);
  const data = await response.json();

  // transform object into array
  //       ...data[key] --> copy everything from data, from the giving key

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
