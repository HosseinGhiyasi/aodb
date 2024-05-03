// * utils
import $fetch from '../utils/$fetch';
import { toggleModal } from '../utils';
import { createFlight } from '../utils/create';

const postFlight = async flight => {
  const data = await $fetch('/flights', {
    method: 'POST',
    body: JSON.stringify(flight),
    headers: { 'Content-Type': 'application/json' },
  });
  const tableBody = document.querySelector('.striped-table tbody');

  tableBody.append(createFlight(flight));
  toggleModal('addFlightModal');

  console.log(data);

  return data;
};

export default postFlight;
