import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

// this will be executed after getStaticProps
// to get to events, we need to pass (props) and then use as props.events
function HomePage(props) {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>Featured events</h1>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default HomePage;
