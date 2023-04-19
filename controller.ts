import argon2 from "argon2";
import { Request, Response } from "express";

// DATABASE
interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export function getAllUsers(req: Request, res: Response) {
  res.status(200).json(users);
}

export async function registerUser(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;
  const hashedPW = await argon2.hash(password);

  const user = { email, password: hashedPW };
  users.push(user);

  res.status(201).json(user);
}

export async function loginUser(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;

  // CHECK USER
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res
      .status(400)
      .json("Incorrect email or password");
  }

  // CHECK PASSWORD
  const isAuth = await argon2.verify(
    user.password,
    password
  );
  if (!isAuth) {
    return res
      .status(400)
      .json("Incorrect email or password");
  }

  // CREATE SESSION/COOKIE
  req.session!.email = user.email;

  // SEND RESPONS
  res.status(200).json("Login successful!");
}

export function getLoggedInUserInfo(req: Request, res: Response) {
  res.status(200).json(req.session);
}
