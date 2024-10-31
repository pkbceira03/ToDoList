import mongoose, {Document, Schema} from "mongoose";

export interface User extends Document{
    id: string;
    name: string;
    email: string;
}

const userSchema: Schema = new Schema({
    name:{type: String, required:true},
    email:{type: String, required:true,unique:true},
});

const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
