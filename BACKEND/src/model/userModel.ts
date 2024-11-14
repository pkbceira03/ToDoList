import mongoose, {Document, Schema, CallbackWithoutResultAndOptionalError} from "mongoose";
import bcrypt from 'bcrypt';

export interface User extends Document{
    id: string;
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema<User> = new Schema({
    name:{type: String, required:true},
    email:{type: String, required:true,unique:true},
    password:{type: String, required:true},
});

userSchema.pre('save', async function (next:CallbackWithoutResultAndOptionalError){
    const user = this as User;

    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }catch (error){
        next(error as Error);
    }
})

userSchema.methods.comparePassword = function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
