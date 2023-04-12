import argon2 from "argon2";
import cookieSession from "cookie-session";
import express from "express";

// SERVER APPLICATION
const app = express();

// DATABASE
interface User {
  email: string;
  password: string;
}

const users: User[] = [];

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

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/users/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPW = await argon2.hash(password);

  const user = { email, password: hashedPW };
  users.push(user);

  res.status(201).json(user);
});

app.post('/users/login', async(req, res) => {
    const { email, password } = req.body;
    
    // CHECK USER
    const user = users.find( u => u.email === email);
    if (!user) {
        return res.status(400).json('Incorrect email or password')
    }
    
    // CHECK PASSWORD
    const isAuth = await argon2.verify(user.password, password);
    if (!isAuth) {
        return res.status(400).json('Incorrect email or password')
    }

    // CREATE SESSION/COOKIE
    req.session!.email = user.email;

    // SEND RESPONS
    res.status(200).json('Login successful!')
})

// START THE SERVER
app.listen(3000, () =>
  console.log("Running on: http://localhost:3000")
);
