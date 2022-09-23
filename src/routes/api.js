import { Router } from "express";
import controllers from "./../controllers/controllers.js";
import { loginMiddleware } from "./middleware/middleware.js";
const { getAll } = controllers;
const api = Router();

api.route("/productos-test")
    .get(getAll);

export default api;
