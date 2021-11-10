import Head from 'next/head';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../helpers/api-util';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    // TODO: important! dynamic path for search results. Po wprowadzeniu parametrów wyszukiwania przejdzie do zakładki [...slug]
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All events</title>
        <meta
          name="description"
          content="find a lot of a great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
