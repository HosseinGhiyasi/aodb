// * utils
import $fetch from '../utils/$fetch';

const deleteFlight = async flightNumber => {
  const data = await $fetch(`/flights/${flightNumber}`, { method: 'DELETE' });
  const tableRow = document.getElementById(flightNumber);

  tableRow.remove();
  return data;
};

export default deleteFlight;
