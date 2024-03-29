import express from 'express';
import { deleteUserById, getUsers, getUserById } from '../db/users';

export const getUser = async (req: any, res: express.Response) => {
  try {
    const id: string = req.userid;
    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: any, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = await getUserById(id);
    
    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
