import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as userService from "../service/userService"
import UserModel from "../model/userModel";

let mongoServer: MongoMemoryServer | null = null;