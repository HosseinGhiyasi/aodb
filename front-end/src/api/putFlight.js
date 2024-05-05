// * utils
import $fetch from '../utils/$fetch';
import { toggleModal } from '../utils';
import { createFlight } from '../utils/create';

const putFlight = async (flightNumber, updatedFlight) => {
  try {
    const data = await $fetch(`/flights/${flightNumber}`, {
      method: 'PUT',
      body: JSON.stringify(updatedFlight),
    });
    const tableRow = document.getElementById(flightNumber);
    const tableBody = tableRow.parentElement;

    tableBody.replaceChild(createFlight(updatedFlight), tableRow);
    toggleModal('UpdateFlight');

    alert('flight was successfully updated');

    return data;
  } catch (err) {
    alert('failed to update the flight');
  }
};

export default putFlight;
