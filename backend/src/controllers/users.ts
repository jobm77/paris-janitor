import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUser, validateUserAuth } from '../validators';
import { generateToken } from '../services';
import { User } from '../models';
import { tokenRevocationList } from '../routers/users';
import { RequestWithUser } from '../middlewares';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environement variables.');
}


const register = async (req: Request, res: Response) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      message: 'User validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  try {
    const { username, firstName, lastName, phoneNumber, email, password, role, dateOfBirth } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      role,
      dateOfBirth
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({ newUser, token });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

const login = async (req: RequestWithUser, res: Response) => {
  const { error, value } = validateUserAuth(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { password, username } = value;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send({ message: "nom d'utilisateur ou mot de passe erroné." });
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "le mot de passe est erroné." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '3h' });

    return res.status(200).send({ message: "authentification de l'user réussie", token, userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "erreur interne" });
  }
};


const adminlogin = async (req: RequestWithUser, res: Response) => {
  const { error, value } = validateUserAuth(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { password, username } = value;

  try {
    const user = await User.findOne({ where: { username } });
    // si l'user n'existe pas
    if (!user) {
      return res.status(401).send({ message: "nom d'utilisateur ou mot de passe erroné." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "le mot de passe est erroné." });
    }

    if (user.role !== 'admin') {
      return res.status(403).send({ message: "Accès refusé. Seuls les administrateurs peuvent se connecter au backoffice." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '3h' });

    return res.status(200).send({ message: "authentification de l'user réussie", token, userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "erreur interne" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { isBan, id, username, password, email, firstname, lastname, dateOfBirth, role, phoneNumber, country, city, address } = req.body;

    const user = await User.findByPk(userId);
    if (user !== null) {
      if (id !== undefined) user.id = id;
      if (username !== undefined) user.username = username;
      if (password !== undefined) user.password = await bcrypt.hash(password, 10);
      if (email !== undefined) user.email = email;
      if (firstname !== undefined) user.firstName = firstname;
      if (lastname !== undefined) user.lastName = lastname;
      if (dateOfBirth !== undefined) user.dateOfBirth = new Date(dateOfBirth);
      if (role !== undefined) user.role = role;
      if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the user." });
  }
};


const logout = async (req: RequestWithUser, res: Response) => {
  try {
    const token = req.token;

    if (token) {
      tokenRevocationList.push(token);
      return res.status(200).json({ message: 'Deconnexion réussie' });
    } else {
      return res.status(400).json({ message: 'Pas de jeton fourni' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Erreur interne', error: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user !== null) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "utilisateur non retrouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur" });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des utilisateurs." });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user !== null) {
      await user.destroy();
      return res.status(200).json({ message: "Suppression de l'utilisateur effectuée" });
    } else {
      return res.status(404).json({ message: "Utilisateur non retrouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur rencontré en essayant de supprimer l'utilisateur" });
  }
};

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Send token back to the client
    res.status(200).json({ resetToken: token });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Error requesting password reset' });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params; 
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'utilisateur pas trouvé' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis a jour' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

export { register, login, getAllUsers, getUserById, deleteUser, updateUser, adminlogin, resetPassword, requestPasswordReset, logout };
