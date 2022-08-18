import { appDataSource } from "./configuration/dataSource";

import axios from "axios";
import express, { Request, Response } from "express";

import StationRoutes from "./routes/stations.route";
import {
  saveIndegoDetails,
  StationData,
} from "./modules/indego/controller/indego.controller";
import { cronService } from "./modules/common/services/cronnjob.service";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

appDataSource
  .initialize()
  .then(async () => {
    console.log("Database initialized");
  })
  .catch((error) => console.error(error));

//0 * * * *
// cronService("*/1 * * * *", async () => {
//   console.log("Cron Service is running");
//   const response = await axios.get<{ features: StationData[]; type: string }>(
//     "https://kiosks.bicycletransit.workers.dev/phl"
//   );

//   if (response) {
//     await saveIndegoDetails(response.data.features);
//   } else {
//     console.log("Failed to fetch bicycle data");
//   }
// });

app.use("/stations", StationRoutes);

app.listen(PORT, () => {
  console.info(`RESTful API Server is listening on port ${PORT}`);
});
