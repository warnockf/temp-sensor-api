import { Router } from 'express';
import moment from 'moment';
import dynamo from '../service/dynamo';

const dynamoService = dynamo();

const router = new Router();

router.get('/', async (req, res) => {
  // TODO: Validation
  const start = req.query.start && moment.unix(req.query.start) || moment().subtract(24, 'hours');
  const end = req.query.end && moment.unix(req.query.end) || moment();

  try {
    const raw = await dynamoService.get(start, end);
    const data = raw.Items.map((item) => ({
      temperature: item.temperature.N,
      timestamp: item.timestamp.S,
    }));
    res.send(data);
  } catch (ex) {
    console.log(ex); // TODO: Proper logging
    res.sendStatus(400);
  }
});

export default router;
