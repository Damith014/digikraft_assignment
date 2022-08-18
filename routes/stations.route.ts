import { Router } from "express";
import {
  getStations,
  getStationsByKioskId,
} from "../modules/indego/controller/indego.controller";
import asyncHandler from "express-async-handler";

const router = Router();

router.get("", asyncHandler(getStations));

router.get("/:kioskId", asyncHandler(getStationsByKioskId));

export default router;
