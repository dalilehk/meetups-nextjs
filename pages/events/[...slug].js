// It will work for more that 1 parameter added after /
// for 1 parameter will be displayed SingleEventPage

import { useRouter } from 'next/router';

function FilteredEvents() {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h2>Filtered Events</h2>
    </div>
  );
}

export default FilteredEvents;
