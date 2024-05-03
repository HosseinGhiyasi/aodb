const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// * routers
const flightRouter = require('./src/routes/flightRouter');
const ticketRouter = require('./src/routes/ticketRouter');
const passengerRouter = require('./src/routes/passengerRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', flightRouter);
app.use('/api/v1', ticketRouter);
app.use('/api/v1', passengerRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
