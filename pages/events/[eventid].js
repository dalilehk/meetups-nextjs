//zczytać id  z event-item i dla tego id wyświetlić dane

import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function SingleEventPage(props) {
  const router = useRouter();
  const eventId = router.query.eventid;

  const chosenEvent = getEventById(eventId);
  console.log(chosenEvent);

  if (!chosenEvent) {
    return <p>no Event found</p>;
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

export default SingleEventPage;
