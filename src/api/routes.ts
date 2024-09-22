import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  loginUserController,
} from "./controllers/user";
import authenticate from "./middleware/auth";
import { createHospController, deleteHospController, getAllHospController, updateHospController } from "./controllers/hosp";
import { createFoodController, deleteFoodController, getAllFoodController, updateFoodController } from "./controllers/food";
import { createEventController, deleteEventController, getAllEventController, updateEventController } from "./controllers/event";
import multer from "multer";
import { imageUploadController } from "./controllers/image";

const routes = express();

routes.post("/user", createUserController);
routes.post("/login", loginUserController);

routes.post("/upload", multer().single("image"), authenticate, imageUploadController);
routes.use(authenticate);

routes.get("/user", getUserController);
routes.delete("/user", deleteUserController);

routes.post("/hosp", createHospController);
routes.get("/hosp", getAllHospController);
routes.put("/hosp/:id", updateHospController);
routes.delete("/hosp/:id", deleteHospController);

routes.post("/food", createFoodController);
routes.get("/food", getAllFoodController);
routes.put("/food/:id", updateFoodController);
routes.delete("/food/:id", deleteFoodController);

routes.post("/event", createEventController);
routes.get("/event", getAllEventController);
routes.put("/event/:id", updateEventController);
routes.delete("/event/:id", deleteEventController);


export default routes;
