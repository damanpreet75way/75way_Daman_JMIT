import dotenv from "dotenv";
import connectDB from './db'
import { httpServer } from "./app";
dotenv.config({
  path: "./.env",
});




const startServer = () => {
    httpServer.listen(process.env.PORT || 8080, () => {

      console.log(" Server is running on port: " + process.env.PORT);
    });
  };



    connectDB()
      .then(() => {
        startServer();
      })
      .catch((err) => {
        console.log("Mongo db connect error: ", err);
      });
  
//   if (majorNodeVersion >= 14) {
//     try {
//       await connectDB();
//       startServer();
//     } catch (err) {
//       console.log("Mongo db connect error: ", err);
//     }
//   } else {
//     connectDB()
//       .then(() => {
//         startServer();
//       })
//       .catch((err) => {
//         console.log("Mongo db connect error: ", err);
//       });
//     }