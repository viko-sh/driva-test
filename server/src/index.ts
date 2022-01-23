import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { QuoteManager } from './lib/quoteManager'

const server = express();
const port = 8080;
server.use(cors());
server.use(bodyParser.json());

const mgr = new QuoteManager();

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

server.post('/quote', async (req, res) => {
  try {
    await mgr.submitInformation(req.body)
    res.json({ code: 200 })
  } catch (err) {
    res.status(500).json({ code: 500 })
  }
})
