import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import {Validator} from 'node-input-validator'
import { merge, get, Object } from 'lodash';

import { getUserById } from '../db/users'; 

interface customrequest extends express.Request {
  userid: string | null;  

}

export const isAuthenticated = async (req: customrequest, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken: string | undefined = req.cookies.authtoken
    if (!sessionToken) {
      console.log(sessionToken)
      return res.status(403).send("token not found");
    }

    try {
      var decoded: any =  jwt.verify(sessionToken, 'secret');
      // merge(req, { identity: decoded.data.id });
      if(!decoded) return res.status(400).send("failed to fetch id")
      req.userid = decoded.data.id;
    } catch(error: any) {
     return res.status(400).send(error.message);
    }

    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export const isOwner = async (req: customrequest, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken: string | undefined = req.cookies.authtoken
   
    if (!sessionToken) {
      console.log(sessionToken)
      return res.status(403).send("token not found");
    }

    try {
      var decoded: any =  jwt.verify(sessionToken, 'secret');
      if(!decoded) return res.status(400).send("User not present")
      // merge(req, { identity: decoded.data.id });
    console.log(decoded)
      const user = await getUserById(decoded.data.id);
      if(!user || user.role  !== "admin") return res.status(400).send("Invalid user");
      return next();
    } catch(error: any) {
      console.log(error)
      return res.status(400).send(error.message);
    }

  } catch (error) {
    console.log(error);
    return res.status(400);
  }
}
export const isUser = async (req: customrequest, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken: string | undefined = req.cookies.authtoken
   
    if (!sessionToken) {
      console.log(sessionToken)
      return res.status(403).send("token not found");
    }

    try {
      var decoded: any =  jwt.verify(sessionToken, 'secret');
      if(!decoded) return res.status(400).send("User not present")
      // merge(req, { identity: decoded.data.id });
      const user = await getUserById(decoded.data.id);
      if(!user || user.role  !== "user") return res.status(400).send("Invalid user");
      next();
    } catch(error: any) {
     return res.status(400).send(error.message);
    }
    
     

    return next();
  } catch(error: any) {
    return res.status(400).send(error.message);
   }
   
}
export const inputvalidation =async (req: express.Request, res: express.Response, next: express.NextFunction) => {

try {
  const v = new Validator(req.body, {
    username: 'maxLength:15',
    email: 'required|email',
    password: 'required'
  }
  );
  const matched = await v.check();

    if(!matched)
    {
      return res.status(400).json(v.errors)
    }
    
  next()
} catch (error: any) {
  console.log(error);
  return res.status(400).send(error.message);
}

}
