import { Request } from "express";
import { IUser } from "../models/User";
import { ObjectId } from "mongoose";

export interface AuthRequest extends Request {
    user: IUser & { _id: ObjectId };
}
