const { poolPromise, sql } = require('../db/db');

const flightModel = {
  getAllFlights: async () => {
    const pool = await poolPromise;
    try {
      const result = await pool.request().query('SELECT * FROM Flight');
      return result.recordset;
    } catch (error) {
      return 500;
    } finally {
      pool.release();
    }
  },

  getFlightByFlightNumber: async flightNumber => {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input('FlightNumber', sql.NVarChar, flightNumber) // avoding sql injections
        .query('SELECT * FROM Flight WHERE FlightNumber = @FlightNumber');

      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return 500;
    } finally {
      pool.release();
    }
  },
  addFlight: async flightData => {
    const pool = await poolPromise;
    try {
      const request = pool.request();

      request.input('FlightNumber', sql.NVarChar(10), flightData.FlightNumber);
      request.input('DepartureAirportCode', sql.VarChar(3), flightData.DepartureAirportCode);
      request.input('DestinationAirportCode', sql.VarChar(3), flightData.DestinationAirportCode);
      request.input('DepartureTime', sql.DateTime, flightData.DepartureTime);
      request.input('ArrivalTime', sql.DateTime, flightData.ArrivalTime);
      request.input('AircraftID', sql.VarChar(10), flightData.AircraftID);
      console.log(flightData.AircraftID);
      request.input('Status', sql.NVarChar(20), flightData.Status);

      const result = await request.execute('InsertFlight');

      if (result.returnValue === 0) {
        return { success: true, message: 'Flight added successfully' };
      } else {
        return { success: false, message: result.output.Error_Message };
      }
    } catch (error) {
      // console.error(error);
      return { success: false, message: 'Internal Server Error', error: error };
    } finally {
      pool.release();
    }
  },
  deleteFlight: async flightNumber => {
    const pool = await poolPromise;
    try {
      const request = pool.request();
      request.input('FlightNumber', sql.NVarChar(10), flightNumber);

      const result = await request.execute('DeleteFlight');

      if (result.returnValue === 0) {
        return { success: true, message: 'Flight deleted successfully' };
      } else {
        return { success: false, message: result.output.Error_Message };
      }
    } catch (error) {
      // console.error(error);
      return { success: false, message: error.message };
    } finally {
      pool.release();
    }
  },
  updateFlight: async (flightNumber, updatedFlightData) => {
    const pool = await poolPromise;
    try {
      const request = pool.request();
      request.input('FlightNumber', sql.NVarChar(10), flightNumber);

      request.input('DepartureAirportCode', sql.VarChar(3), updatedFlightData.DepartureAirportCode);
      request.input(
        'DestinationAirportCode',
        sql.VarChar(3),
        updatedFlightData.DestinationAirportCode
      );
      request.input('DepartureTime', sql.DateTime, updatedFlightData.DepartureTime);
      request.input('ArrivalTime', sql.DateTime, updatedFlightData.ArrivalTime);
      request.input('AircraftID', sql.VarChar(10), updatedFlightData.AircraftID);
      request.input('Status', sql.NVarChar(20), updatedFlightData.Status);

      const result = await request.execute('UpdateFlight');

      if (result.returnValue === 0) {
        return { success: true, message: 'Flight updated successfully' };
      } else {
        return { success: false, message: result.output.Error_Message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    } finally {
      pool.release();
    }
  },
  getFlightsByRoute: async (departureCity, destinationCity) => {
    const pool = await poolPromise;
    try {
      const request = pool.request();
      request.input('DepartureCity', sql.NVarChar(100), departureCity);
      request.input('DestinationCity', sql.NVarChar(100), destinationCity);

      const result = await request.query(
        'select * from getFlightsByRoute_fn(@DepartureCity,@DestinationCity)'
      );

      if (result.recordset.length === 0) {
        return { success: false, message: 'No flight Found with this route' };
      } else {
        return { success: true, data: result.recordset };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    } finally {
      pool.release();
    }
  },
  searchFlight: async (departureCity, destinationCity, departureTime) => {
    const pool = await poolPromise;
    try {
      const request = pool.request();
      request.input('DepartureCity', sql.NVarChar(100), departureCity);
      request.input('DestinationCity', sql.NVarChar(100), destinationCity);
      request.input('DepartureTime', sql.Date, departureTime);

      const result = await request.query(
        'select * from searchFlight(@DepartureCity,@DestinationCity,@DepartureTime)'
      );
      if (result.recordset.length === 0) {
        return { success: false, message: 'Search Failed and Flight is not found.' };
      } else {
        return { success: true, data: result.recordset };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    } finally {
      pool.release();
    }
  },
};

module.exports = flightModel;
