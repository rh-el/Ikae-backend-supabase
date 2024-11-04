import express, { Express, Request, Response } from "express";
import productRoutes from "./app/routes/products-routes";

const cors = require('cors')
const app: Express = express();
app.use(cors());
app.use(express.json());


// creates a GET request endpoint on the root path
// returns a message
// app.get('/', (req: Request, res: Response) => {    
//     res.send('coucou')
//     }
// )

productRoutes(app)


// launch request listener on port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});