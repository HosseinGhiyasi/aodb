// * api
import deleteFlight from '../api/deleteFlight';
import getFlightByFlightNo from '../api/getFlightByFlightNo';

// * utils
import { toggleModal } from '.';

export const createFlight = flight => {
  const fields = [
    'FlightNumber',
    'DestinationAirportCode',
    'DepartureTime',
    'ArrivalTime',
    'AircraftID',
    'Status',
  ];

  const tableRow = document.createElement('tr');
  const rowCtrls = document.createElement('td');
  const updateBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const dataCells = [];

  tableRow.id = flight.FlightNumber;

  updateBtn.className = 'update-button';
  deleteBtn.className = 'delete-button';
  updateBtn.innerText = 'Update';
  deleteBtn.innerText = 'Delete';

  deleteBtn.onclick = deleteFlight.bind(null, flight.FlightNumber);
  updateBtn.onclick = toggleModal.bind(null, 'UpdateFlight', async modal => {
    modal.dataset.flightNumber = flight.FlightNumber;

    if (!modal.classList.contains('visible')) return;

    try {
      const data = await getFlightByFlightNo(flight.FlightNumber);

      for (const field in data) {
        const inputField = modal.querySelector(`[name="${field}"]`);
        if (!inputField) continue;
        inputField.value = data[field];
      }
    } catch (err) {
      console.error(err);
    }
  });

  dataCells.push(
    ...fields.map(f => {
      const tableCell = document.createElement('td');
      const fieldData = flight[f] ?? '';

      tableCell.innerText = fieldData;
      return tableCell;
    })
  );

  rowCtrls.append(updateBtn, deleteBtn);
  tableRow.append(...dataCells, rowCtrls);

  return tableRow;
};
