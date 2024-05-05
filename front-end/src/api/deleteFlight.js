// * utils
import $fetch from '../utils/$fetch';

const deleteFlight = async flightNumber => {
  try {
    const data = await $fetch(`/flights/${flightNumber}`, { method: 'DELETE' });
    const tableRow = document.getElementById(flightNumber);

    tableRow.remove();
    alert('flight was removed successfully');
    return data;
  } catch (err) {
    alert('failed to remove the flight');
  }
};

export default deleteFlight;
