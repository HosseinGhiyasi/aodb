// * api
import putFlight from './src/api/putFlight';
import postFlight from './src/api/postFlight';
import getFlights from './src/api/getFlights';
import getFlightByFlightNo from './src/api/getFlightByFlightNo';

// * utils
import { toggleModal } from './src/utils';
import { createFlight } from './src/utils/create';

// * styles
import './style.css';

const tableBody = document.querySelector('.striped-table tbody');

window.onload = async () => {
  // * initializing ctrls
  const addFlightBtn = document.querySelector('.add-flight-btn');

  addFlightBtn.onclick = () => toggleModal('addFlightModal');

  // * fetching and rendering all flights
  const flights = await getFlights();
  tableBody.innerHTML = '';

  for (const flight of flights) {
    const tableRow = createFlight(flight);
    tableBody.append(tableRow);
  }
};

const addForm = document.forms.namedItem('add-flight');
const updateForm = document.forms.namedItem('update-flight');

updateForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(updateForm);

  const updatedFlight = [...formData.entries()].reduce((dt, [field, value]) => {
    dt[field] = value;
    return dt;
  }, {});

  const flightNumber = updateForm.dataset.flightNumber;
  putFlight(flightNumber, updatedFlight);
};

addForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(addForm);

  const flight = [...formData.entries()].reduce((dt, [field, value]) => {
    dt[field] = value;
    return dt;
  }, {});

  // ! hardcoded due to front-end and back-end incompatibility
  postFlight({ ...flight, DepartureAirportCode: 'MHD' });
};

// * search-by-flight-number implementation
const flightNoSearchBox = document.getElementById('search-by-number');
const flightNoSearchBtn = flightNoSearchBox.querySelector('button');
const flightNoSearchInput = flightNoSearchBox.querySelector('input');

flightNoSearchBtn.onclick = async () => {
  const query = flightNoSearchInput.value.trim();

  if (!query) return;

  const flight = await getFlightByFlightNo(query);
  tableBody.innerHTML = '';
  tableBody.append(createFlight(flight));
};
