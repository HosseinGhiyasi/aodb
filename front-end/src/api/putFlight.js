// * utils
import $fetch from '../utils/$fetch';
import { toggleModal } from '../utils';
import { createFlight } from '../utils/create';

const putFlight = async (flightNumber, updatedFlight) => {
  const data = await $fetch(`/flights/${flightNumber}`, {
    method: 'PUT',
    body: JSON.stringify(updatedFlight),
  });
  const tableRow = document.getElementById(flightNumber);
  const tableBody = tableRow.parentElement;

  tableBody.replaceChild(createFlight(updatedFlight), tableRow);
  toggleModal('UpdateFlight');

  return data;
};

export default putFlight;
