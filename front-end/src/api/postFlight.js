// * utils
import $fetch from '../utils/$fetch';
import { toggleModal } from '../utils';
import { createFlight } from '../utils/create';

const postFlight = async flight => {
  try {
    const data = await $fetch('/flights', {
      method: 'POST',
      body: JSON.stringify(flight),
      headers: { 'Content-Type': 'application/json' },
    });
    const tableBody = document.querySelector('.striped-table tbody');

    tableBody.append(createFlight(flight));
    toggleModal('addFlightModal');

    alert('flight was added successfully');
    return data;
  } catch (err) {
    alert('failed to add the new flight');
  }
};

export default postFlight;
