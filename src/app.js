const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const flightRouter = require('./routes/flightRouter');
const ticketRouter = require('./routes/ticketRouter');
const passengerRouter = require('./routes/passengerRouter');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', flightRouter);
app.use('/api/v1', ticketRouter);
app.use('/api/v1', passengerRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});