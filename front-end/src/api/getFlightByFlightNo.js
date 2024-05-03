// * utils
import $fetch from '../utils/$fetch';

const getFlightByFlightNo = async flightNumber => {
  try {
    return await $fetch(`/flights/${flightNumber}`);
  } catch (err) {
    if (err.code === 404) {
      alert(`no results were found for flight-no:${flightNumber}`);
    }

    console.error(err);
  }
};

export default getFlightByFlightNo;
