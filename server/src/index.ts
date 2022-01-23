import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import connection from './connection';
import Quote from './Quote.model';
import { RequestHandler } from 'express';
const server = express();
const port = 8080;
server.use(cors());
server.use(bodyParser.json() as RequestHandler);

connection.authenticate()
connection.addModels([Quote])

server.post('/',async (req, res)=>{
  try {
    await Quote.create({
      status: 1,
      quoteData: req.body
    },{
      silent: true
    })
    res.statusCode = 200
    res.send()
  } catch (error) {
    res.statusCode = 500
    console.log(error)
    res.send(JSON.stringify(error))
  }

})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
