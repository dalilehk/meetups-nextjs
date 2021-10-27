const events_data = [
  {
    id: 11,
    title: 'event 1',
    city: 'Warsaw',
  },
  {
    id: 21,
    title: 'event 2',
    city: 'Berlin',
  },
  {
    id: 31,
    title: 'event 3',
    city: 'Danzig',
  },
  {
    id: 41,
    title: 'event 4',
    city: 'Munich',
  },
  {
    id: 15,
    title: 'event 5',
    city: 'Rome',
  },
];

import Link from 'next/link';
function AllEventsPage() {
  return (
    <div>
      <h1>All events</h1>

      <ul className="events">
        {events_data.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllEventsPage;
