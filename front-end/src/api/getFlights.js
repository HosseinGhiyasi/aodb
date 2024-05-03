// * utils
import $fetch from '../utils/$fetch';

const getFlights = async () => {
  const data = await $fetch('/flights');
  return data;
};

export default getFlights;
