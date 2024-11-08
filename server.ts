import express, { Express, Request, Response } from "express";
import productRoutes from "./app/routes/products-routes";

const cors = require('cors')
const app: Express = express();
app.use(cors());
app.use(express.json());


productRoutes(app)

app.use(express.static('app'))
app.use('/img', express.static('img'))

// launch request listener on port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});