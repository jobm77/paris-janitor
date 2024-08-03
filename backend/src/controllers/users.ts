import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import { validateUser, validateUserAuth } from '../validation';
import { generateToken } from '../services';
import { User } from '../models';
import { tokenRevocationList } from '../routers/users';
//import dotenv from 'dotenv';

//dotenv.config();
 
/*
const register = async (req: Request, res: Response) => {
  const { error, value } = //validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { username, firstName, lastName, phoneNumber, email, password, role } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};





export { register };
*/