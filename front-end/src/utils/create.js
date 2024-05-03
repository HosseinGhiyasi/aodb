// * api
import deleteFlight from '../api/deleteFlight';

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
  updateBtn.onclick = toggleModal.bind(null, 'UpdateFlight', modal => {
    modal.dataset.flightNumber = flight.FlightNumber;
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
