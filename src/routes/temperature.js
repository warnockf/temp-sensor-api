import { Router } from 'express';
import moment from 'moment';
import dynamo from '../service/dynamo';

const dynamoService = dynamo();

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const timeStart = moment().subtract(24, 'hours');
    const timeEnd = moment();
    const raw = await dynamoService.get(timeStart, timeEnd);
    const data = raw.Items.map((item) => ({
      temperature: item.temperature.N,
      timestamp: item.timestamp.S,
    }));
    res.send(data);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(400);
  }
});

// TODO: endpoint with paramst for start/end time

export default router;
