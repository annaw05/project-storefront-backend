import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//import routes
import ordersRoutes from './handlers/orders';
import productsRoutes from './handlers/products';
import userRoutes from './handlers/users';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());


ordersRoutes(app);
productsRoutes(app);
userRoutes(app);
dashboardRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
