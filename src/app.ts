import express,{Express} from 'express'
import {createServer} from 'http'
import cors from 'cors'

const app :Express = express();

const httpServer = createServer(app);
import {errorHandler} from './middlewares/error.middleware'
app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === "*"
          ? "*" 
          : process.env.CORS_ORIGIN?.split(","), 
      credentials: true,
    })
  );

  //global middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


//user Router
import userRouter from './routes/user.routes'
app.use('/user',userRouter)

//Bus Router
import busRouter from './routes/bus.routes'
app.use('/bus',busRouter)

//discount router
import discountRouter from './routes/discount.routes'
app.use('/discount',discountRouter)
//for errors
app.use(errorHandler);

export {httpServer}
