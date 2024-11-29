import express, { Express } from "express";
import routes from "./app/routes/routes";
import dotenv from 'dotenv'

dotenv.config()


const cors = require('cors')
const app: Express = express();
app.use(cors());
app.use(express.json());

// call the router module with the express server
routes(app)

app.get('/debug-env', (req, res) => {
  res.send({ secretKey: process.env.TOKEN_SECRET || 'undefined' });
});

// used to serve images stored locally 
//app.use(express.static('app'))
// app.use('/img', express.static('img'))

// launch request listener on port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});