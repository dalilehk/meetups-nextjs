// It will work for more that 1 parameter added after /
// for 1 parameter will be displayed SingleEventPage
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FIREBASE_URL =
  'https://events-db-e2356-default-rtdb.europe-west1.firebasedatabase.app/events.json';

function FilteredEvents(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;
  console.log(filterData);

  // send a request to firebase in order to filter events
  // it gives us an object with data and possible error
  const fetcher = (FIREBASE_URL) =>
    fetch(FIREBASE_URL).then((res) => res.json());

  const { data, error } = useSWR(FIREBASE_URL, fetcher);

  console.log(data);
  // dependency: data.  --> It will re-run every time, whenever the data fetched changes
  useEffect(() => {
    // If we have data, we're going to transform incoming data  into array. This array will be set as State.
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  console.log(loadedEvents);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // reusing logic for head
  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numMonth}`}
      />
    </Head>
  );

  // Handle false URL
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events </Button>
        </div>
      </Fragment>
    );
  }

  // from api-util
  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>No events found</ErrorAlert>
        <Button link="/events">Back to all events</Button>
      </Fragment>
    );
  }

  // to EventList props:
  const date = new Date(numYear, numMonth - 1);
  console.log(date);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // Handle false URL
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEvents;
