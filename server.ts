import cookieSession from "cookie-session";
import express from "express";
import {
  getAllUsers,
  getAuth,
  loginUser,
  registerUser,
} from "./controller";

// SERVER APPLICATION
const app = express();

// GLOBAL MIDDLEWARES
// 1. json
// 2. cookie-session
app.use(express.json());
app.use(
  cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "jqgi326kdf76fs8d9f6s9fsafs135ts",
    maxAge: 1000 * 20,
  })
);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to my API, please login!");
});

app.get("/users", getAllUsers);

app.post("/users/register", registerUser);

app.post("/users/login", loginUser);

app.get("/users/auth", getAuth);

// START THE SERVER
app.listen(3000, () =>
  console.log("Running on: http://localhost:3000")
);
