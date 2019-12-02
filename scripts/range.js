import dynamo from '../src/service/dynamo';
import moment from 'moment';

const db = dynamo();

const get = async () => {
  const data = await db.get(moment().subtract(10, 'minutes'), moment());
  console.log(data);
};

get();
