// * utils
import $fetch from '../utils/$fetch';

const getFlights = async () => {
  try {
    const data = await $fetch('/flights');
    return data;
  } catch (err) {
    alert('failed to fetch all flight at /flights')
  }
};

export default getFlights;
