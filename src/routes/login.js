import { Router } from "express";
import { loginMiddleware } from "./middleware/middleware.js";
const login = Router();

login.get("/", loginMiddleware, (req, res) => {
  res.render("index", { user: req.session.user });
});

login
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    req.session.user = req.body.user;
    res.redirect("/");
  });

login.get("/logout",(req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

export default login;
