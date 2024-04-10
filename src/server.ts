import express from "express";
import { connect } from "./database/conn";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3030;

app.use(routes);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server listenning on port: ${port}`);
      });
    } catch (error) {
      console.log("Error on connect to server", error);
    }
  })
  .catch((error: Error) => {
    console.log("Error on connect to database", error);
  });
