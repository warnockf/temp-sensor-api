import express from 'express';
import bodyParser from 'body-parser';
import settings from './service/settings';
import temperatuReouter from './routes/temperature';

const app = express();

// Register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Register routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/temperature', temperatuReouter);

// Start the server
const port = settings.expressPort;
app.listen(port, () => console.log(`temp-sensor-api is listening on port ${port}`));
