import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

let refreshTokens: string[] = [];
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({"message": "empty fields"});
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(400).json({"message": "user not found"});
    }

    const expectedHash = authentication(user.authentication.salt, password);
    console.log(user.authentication.password !== expectedHash)
    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({"message": "Invalid user. not matching"});
    }


    const token: string = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {id: user._id}
    }, 'secret');
    const refreshtoken: string = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {id: user._id}
    }, 'secret');
    refreshTokens.push(refreshtoken)
    await user.save();

     res.cookie('authtoken', token, { domain: 'localhost', path: '/',  maxAge: 1000 * 60 * 60 * 2 * 30 * 12 * 3000, httpOnly: false });
     res.cookie('refreshtoken', refreshtoken, { domain: 'localhost', path: '/',  maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 3000, httpOnly: false });

    return res.status(200).json({"message": "login success"}).end();
  } catch (error: any) {
    return res.status(400).json({"message": error.message});
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;

    if (!email || !password || !username || !role) {
      return res.status(400).json({"message": "empty fields"});
    }

    const existingUser = await getUserByEmail(email);
   
    if (existingUser) {
      return res.status(400).json({"message": "User already exits"});
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role
    });

    return res.status(200).json(user).end();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({"message": error.message});
  }
}
export const refreshtoken =async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken: string | undefined = req.cookies.refreshtoken
    if (!refreshToken) {
      return res.status(403).json({"message": "token not found!! Login again"});
    }

    try {
      if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
      var decoded: any =  jwt.verify(refreshToken, 'secret');
      // merge(req, { identity: decoded.data.id });
      if(!decoded) return res.status(400).json({"message": "failed to fetch id"})
      const token: string = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {id: decoded.data.id}
      }, 'secret');
      res.cookie('authtoken', token);
      return res.status(200).json({"message": "Cookie set successfully"})
    } catch(error: any) {
     return res.status(400).json({"message": error.message});
    }
  } catch (error) {
    return res.status(400).json({"message": error.message});
  }
}