import { Request, Response } from "express";
import { User } from "../../domain/user";
import { error } from "../../domain/error";
import {
  checkIfUserExists,
  createUser,
  deleteUser,
  getUserByEmail,
} from "../../infra/user";
import { AuthService, PasswordService } from "../service/utils";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new error("Missing required fields", 400);
  }

  if (await checkIfUserExists(email))
    throw new error("User already exists", 409);

  const hashedPassword = await PasswordService.encryptPassword(password);

  const user = new User(name, email, hashedPassword);

  createUser(user);

  res.status(204).json();
};

const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new error("Missing required fields", 400);
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new error("User not found", 404);
  }

  const isMatch = await PasswordService.comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new error("Invalid password", 401);
  }

  const token = AuthService.generateToken(user.id);

  res.status(200).json({ name: user.name, token });
};

const getUserController = async (req: Request, res: Response) => {
  const { user } = req.body;

  res.status(200).json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  const { user } = req.body;

  await deleteUser(user.id);

  res.status(204).send();
};

export {
  createUserController,
  loginUserController,
  getUserController,
  deleteUserController,
};
