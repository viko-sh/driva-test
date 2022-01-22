import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const server = express();
const port = 8080;
server.use(cors());
server.use(bodyParser.json());

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

server.post('/quote', (req, res) => {
  res.send(204)
})