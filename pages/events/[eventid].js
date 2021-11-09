//zczytać id  z event-item i dla tego id wyświetlić dane

import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function SingleEventPage(props) {
  const chosenEvent = props.selectedEvent;

  if (!chosenEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, image, date, location, description } = chosenEvent;

  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}

// we need contect, because we need to know for wihich specific ID we load the data
export async function getStaticProps(context) {
  const eventid = context.params.eventid;

  const event = await getEventById(eventid);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

// [eventid] is a dynamic page. This function will tell next.js for which parameter values (for which ids) it should prerender this page and call getStaticProps and component function
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventid: event.id },
  }));
  return {
    paths: paths,
    fallback: true,
    // Fallback --> To let JS know if there are more values or we did specified ALL paths here.
    // Fallback: false means, that if try to load this page for unknow id, it should load 404 page.
    // fallback: true --> there is more values, than specified. It will fetch the data.
    // 'blocking': will send a request and fetch the data AND will be waitng until the data is ready
  };
}

export default SingleEventPage;
