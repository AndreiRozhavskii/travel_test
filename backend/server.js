import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
