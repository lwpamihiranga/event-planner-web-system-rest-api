const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');

const PORT = process.env.PORT || 5000;

const databaseConnector = require('./utils/db');

const eventRouter = require('./resources/event/event.router');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/event', eventRouter);

app.listen(PORT, () => {
    databaseConnector.connectDatabase();
    console.log(`REST API on http://localhost:${PORT}/api`);
});