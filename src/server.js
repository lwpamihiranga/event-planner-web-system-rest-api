const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`REST API on http://localhost:${PORT}/api`);
});