import Link from 'next/link';
// import Image from 'next/image';
import Button from '../ui/button';
import classes from './event-item.module.css';

function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanRedableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <time>{humanRedableDate}</time>
        </div>
        <div>
          <address className={classes.address}>{formattedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
