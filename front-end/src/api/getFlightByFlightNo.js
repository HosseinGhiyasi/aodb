// * utils
import $fetch from '../utils/$fetch';

const getFlightByFlightNo = async flightNumber => {
  try {
    return await $fetch(`/flights/${flightNumber}`);
  } catch (err) {
    console.error(err);

    if (err.code === 404) {
      alert(`no results were found for flight-no:${flightNumber}`);
      return;
    }

    alert('failed to search for the flight with the given flight number');
  }
};

export default getFlightByFlightNo;
